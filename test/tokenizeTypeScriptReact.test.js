import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScriptReact.js'

const getTagTokens = (source) => {
  const tagTokens = []
  let lineState = structuredClone(initialLineState)
  for (const line of source.split('\n')) {
    lineState = tokenizeLine(line, lineState)
    let offset = 0
    for (let index = 0; index < lineState.tokens.length; index += 2) {
      const tokenName = TokenMap[lineState.tokens[index]]
      const tokenLength = lineState.tokens[index + 1]
      if (tokenName === 'PunctuationTag' || tokenName === 'TagName') {
        tagTokens.push([tokenName, line.slice(offset, offset + tokenLength)])
      }
      offset += tokenLength
    }
  }
  return tagTokens
}

test('highlights TSX tags like HTML tags', () => {
  const source = `const Card = ({ title }: { title: string }) => <article>{title}</article>
const view = (
  <>
    <section id="main">
      <Card title="Hello" />
      <Layout.Header><svg:path /></Layout.Header>
    </section>
  </>
)`

  assert.deepEqual(getTagTokens(source), [
    ['PunctuationTag', '<'],
    ['TagName', 'article'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '</'],
    ['TagName', 'article'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '<>'],
    ['PunctuationTag', '<'],
    ['TagName', 'section'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '<'],
    ['TagName', 'Card'],
    ['PunctuationTag', '/>'],
    ['PunctuationTag', '<'],
    ['TagName', 'Layout.Header'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '<'],
    ['TagName', 'svg:path'],
    ['PunctuationTag', '/>'],
    ['PunctuationTag', '</'],
    ['TagName', 'Layout.Header'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '</'],
    ['TagName', 'section'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '</>'],
  ])
})

test('preserves TypeScript generic highlighting in TSX', () => {
  const source = `const identity = <T,>(value: T): T => value
const list: Array<string> = []
const markup = '<article></article>'`

  assert.deepEqual(getTagTokens(source), [])
})

test('highlights multiline TSX tag punctuation', () => {
  const source = `const element = <Button
  title="Hello"
/>`

  assert.deepEqual(getTagTokens(source), [
    ['PunctuationTag', '<'],
    ['TagName', 'Button'],
    ['PunctuationTag', '/>'],
  ])
})
