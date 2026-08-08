import {
  initialLineState as initialTypeScriptLineState,
  TokenType,
  tokenizeLine as tokenizeTypeScriptLine,
} from './tokenizeTypeScript.js'

export * from './tokenizeTypeScript.js'

export const initialLineState = {
  ...initialTypeScriptLineState,
  insideJsxTag: false,
  jsxElementDepth: 0,
}

const RE_JSX_TAG = /<\/?([A-Za-z_$][\w$-]*(?:[.:][A-Za-z_$][\w$-]*)*)/g
const RE_JSX_FRAGMENT = /<\/?>(?!>)/g
const RE_TYPE_PARAMETER_SUFFIX = /^\s*(?:,|=|extends\b)/

const getTokenTypeAtOffset = (tokens, offset) => {
  let tokenOffset = 0
  for (let index = 0; index < tokens.length; index += 2) {
    const tokenType = tokens[index]
    const tokenEnd = tokenOffset + tokens[index + 1]
    if (offset < tokenEnd) {
      return tokenType
    }
    tokenOffset = tokenEnd
  }
  return TokenType.None
}

const isLikelyJsxTag = (line, match, tokens, jsxElementDepth) => {
  const openingOffset = match.index
  if (getTokenTypeAtOffset(tokens, openingOffset) !== TokenType.Punctuation) {
    return false
  }
  if (match[0][1] === '/') {
    return true
  }
  const tagName = match[1]
  const suffix = line.slice(openingOffset + match[0].length)
  if (RE_TYPE_PARAMETER_SUFFIX.test(suffix)) {
    return false
  }
  const previousCharacter = line[openingOffset - 1] || ''
  if (/[$\w\])]/.test(previousCharacter) && jsxElementDepth === 0) {
    return false
  }
  if (/^>\s*\(/.test(suffix)) {
    return false
  }
  return true
}

const findTagEnd = (line, startOffset) => {
  let braceDepth = 0
  let quote = ''
  for (let index = startOffset; index < line.length; index++) {
    const character = line[index]
    if (quote) {
      if (character === '\\') {
        index++
      } else if (character === quote) {
        quote = ''
      }
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
    } else if (character === '{') {
      braceDepth++
    } else if (character === '}') {
      braceDepth = Math.max(0, braceDepth - 1)
    } else if (character === '>' && braceDepth === 0) {
      const isSelfClosing = line[index - 1] === '/'
      return {
        end: index + 1,
        start: isSelfClosing ? index - 1 : index,
      }
    }
  }
  return undefined
}

const getJsxTagRanges = (
  line,
  tokens,
  wasInsideJsxTag,
  previousJsxElementDepth
) => {
  const ranges = []
  let insideJsxTag = wasInsideJsxTag
  let jsxElementDepth = previousJsxElementDepth
  let searchOffset = 0

  if (insideJsxTag) {
    const tagEnd = findTagEnd(line, 0)
    if (!tagEnd) {
      return { insideJsxTag, jsxElementDepth, ranges }
    }
    ranges.push({
      end: tagEnd.end,
      start: tagEnd.start,
      tokenType: TokenType.PunctuationTag,
    })
    if (line.slice(tagEnd.start, tagEnd.end) === '/>') {
      jsxElementDepth = Math.max(0, jsxElementDepth - 1)
    }
    insideJsxTag = false
    searchOffset = tagEnd.end
  }

  RE_JSX_TAG.lastIndex = searchOffset
  let match
  while ((match = RE_JSX_TAG.exec(line))) {
    if (!isLikelyJsxTag(line, match, tokens, jsxElementDepth)) {
      continue
    }
    const openingOffset = match.index
    const tagNameOffset = openingOffset + (match[0][1] === '/' ? 2 : 1)
    ranges.push({
      end: tagNameOffset,
      start: openingOffset,
      tokenType: TokenType.PunctuationTag,
    })
    ranges.push({
      end: tagNameOffset + match[1].length,
      start: tagNameOffset,
      tokenType: TokenType.TagName,
    })
    const isClosingTag = match[0][1] === '/'
    if (isClosingTag) {
      jsxElementDepth = Math.max(0, jsxElementDepth - 1)
    } else {
      jsxElementDepth++
    }
    const tagEnd = findTagEnd(line, RE_JSX_TAG.lastIndex)
    if (!tagEnd) {
      insideJsxTag = true
      break
    }
    ranges.push({
      end: tagEnd.end,
      start: tagEnd.start,
      tokenType: TokenType.PunctuationTag,
    })
    if (!isClosingTag && line.slice(tagEnd.start, tagEnd.end) === '/>') {
      jsxElementDepth--
    }
    RE_JSX_TAG.lastIndex = tagEnd.end
  }

  RE_JSX_FRAGMENT.lastIndex = 0
  while ((match = RE_JSX_FRAGMENT.exec(line))) {
    if (getTokenTypeAtOffset(tokens, match.index) === TokenType.Punctuation) {
      ranges.push({
        end: match.index + match[0].length,
        start: match.index,
        tokenType: TokenType.PunctuationTag,
      })
    }
  }

  ranges.sort((rangeA, rangeB) => rangeA.start - rangeB.start)
  return { insideJsxTag, jsxElementDepth, ranges }
}

const applyTokenRanges = (tokens, ranges) => {
  if (ranges.length === 0) {
    return tokens
  }
  const boundaries = new Set([0])
  const tokenSegments = []
  let offset = 0
  for (let index = 0; index < tokens.length; index += 2) {
    const end = offset + tokens[index + 1]
    tokenSegments.push({ end, start: offset, tokenType: tokens[index] })
    boundaries.add(end)
    offset = end
  }
  for (const range of ranges) {
    boundaries.add(range.start)
    boundaries.add(range.end)
  }

  const sortedBoundaries = [...boundaries].toSorted((a, b) => a - b)
  const highlightedTokens = []
  let rangeIndex = 0
  let segmentIndex = 0
  let previousKey = ''
  for (let index = 0; index < sortedBoundaries.length - 1; index++) {
    const start = sortedBoundaries[index]
    const end = sortedBoundaries[index + 1]
    while (ranges[rangeIndex] && ranges[rangeIndex].end <= start) {
      rangeIndex++
    }
    while (tokenSegments[segmentIndex].end <= start) {
      segmentIndex++
    }
    const range = ranges[rangeIndex]
    const isHighlighted = range && range.start <= start && end <= range.end
    const key = isHighlighted ? `range-${rangeIndex}` : `token-${segmentIndex}`
    const tokenType = isHighlighted
      ? range.tokenType
      : tokenSegments[segmentIndex].tokenType
    if (key === previousKey) {
      highlightedTokens[highlightedTokens.length - 1] += end - start
    } else {
      highlightedTokens.push(tokenType, end - start)
      previousKey = key
    }
  }
  return highlightedTokens
}

export const tokenizeLine = (line, lineState) => {
  const result = tokenizeTypeScriptLine(line, lineState)
  const { insideJsxTag, jsxElementDepth, ranges } = getJsxTagRanges(
    line,
    result.tokens,
    lineState.insideJsxTag || false,
    lineState.jsxElementDepth || 0
  )
  return {
    ...result,
    insideJsxTag,
    jsxElementDepth,
    tokens: applyTokenRanges(result.tokens, ranges),
  }
}
