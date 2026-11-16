import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScript.js'

const tokenize = (source) => {
  let state = structuredClone(initialLineState)
  return source.split('\n').flatMap((line) => {
    state = tokenizeLine(line, state)
    const tokens = []
    let offset = 0
    for (let index = 0; index < state.tokens.length; index += 2) {
      const length = state.tokens[index + 1]
      const text = line.slice(offset, offset + length)
      tokens.push([TokenMap[state.tokens[index]], text])
      offset += length
    }
    assert.equal(offset, line.length)
    return tokens.filter(([type]) => type !== 'Whitespace')
  })
}

test('highlights chained primitive assertions in a call argument', () => {
  assert.deepEqual(
    tokenize(
      "await expect(item).toHaveCSS('mask-size', maskSizeRegex as unknown as string)"
    ).slice(-7),
    [
      ['Punctuation', ','],
      ['VariableName', 'maskSizeRegex'],
      ['KeywordControl', 'as'],
      ['TypePrimitive', 'unknown'],
      ['KeywordControl', 'as'],
      ['TypePrimitive', 'string'],
      ['Punctuation', ')'],
    ]
  )
})

test('highlights primitive assertion operands and preserves following expressions', () => {
  for (const primitive of ['unknown', 'string', 'number', 'boolean', 'any']) {
    const tokens = tokenize(
      `const result = value as ${primitive}; consume(value)`
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'TypePrimitive' && text === primitive
      )
    )
    assert.deepEqual(tokens.slice(-4), [
      ['Function', 'consume'],
      ['Punctuation', '('],
      ['VariableName', 'value'],
      ['Punctuation', ')'],
    ])
  }
})

test('highlights assertion chains continued on later lines', () => {
  const tokens = tokenize(`const result = value as unknown
  as string
const later = 42`)
  assert.deepEqual(
    tokens.filter(([, text]) => ['as', 'unknown', 'string'].includes(text)),
    [
      ['KeywordControl', 'as'],
      ['TypePrimitive', 'unknown'],
      ['KeywordControl', 'as'],
      ['TypePrimitive', 'string'],
    ]
  )
  assert.deepEqual(tokens.slice(-4), [
    ['Keyword', 'const'],
    ['VariableName', 'later'],
    ['Punctuation', '='],
    ['Numeric', '42'],
  ])
})

test('returns to expression highlighting after primitive assertions', () => {
  const tokens = tokenize(`if (value as number < 10) {
  return "ready"
}
const next = 42`)
  assert.ok(
    tokens.some(([type, text]) => type === 'KeywordReturn' && text === 'return')
  )
  assert.ok(
    tokens.some(([type, text]) => type === 'String' && text === 'ready')
  )
  assert.deepEqual(tokens.slice(-4), [
    ['Keyword', 'const'],
    ['VariableName', 'next'],
    ['Punctuation', '='],
    ['Numeric', '42'],
  ])
})

test('does not match primitive prefixes inside named assertion types', () => {
  const tokens = tokenize('const result = value as unknownValue')
  assert.ok(!tokens.some(([type]) => type === 'TypePrimitive'))
})
