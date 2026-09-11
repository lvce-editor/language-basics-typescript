import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
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

test('preserves TSX highlighting after import type queries', async () => {
  const source = await readFile(
    new URL('./cases/typeof-import-code-editor.tsx', import.meta.url),
    'utf8'
  )

  assert.deepEqual(getTagTokens(source), [
    ['PunctuationTag', '<'],
    ['TagName', 'Pane'],
    ['PunctuationTag', '/>'],
  ])
})

const getTokens = (source) => {
  const tokens = []
  let lineState = structuredClone(initialLineState)
  for (const line of source.split('\n')) {
    lineState = tokenizeLine(line, lineState)
    let offset = 0
    for (let index = 0; index < lineState.tokens.length; index += 2) {
      const length = lineState.tokens[index + 1]
      tokens.push([
        TokenMap[lineState.tokens[index]],
        line.slice(offset, offset + length),
      ])
      offset += length
    }
    assert.equal(offset, line.length)
  }
  return tokens
}

test('highlights JSX child text instead of TypeScript keywords and strings', () => {
  const text = `this return true 123 "hello" don't // comment &amp; 😀 `
  const tokens = getTokens(`<h1>${text}</h1>`)
  assert.ok(tokens.some(([type, value]) => type === 'Text' && value === text))
  assert.deepEqual(getTagTokens(`<h1>${text}</h1>`), [
    ['PunctuationTag', '<'],
    ['TagName', 'h1'],
    ['PunctuationTag', '>'],
    ['PunctuationTag', '</'],
    ['TagName', 'h1'],
    ['PunctuationTag', '>'],
  ])
})

test('preserves expressions, nested elements, fragments, and multiline child text', async () => {
  const source = await readFile(
    new URL('./cases/tsx-child-text.tsx', import.meta.url),
    'utf8'
  )
  const tokens = getTokens(source)
  const text = tokens
    .filter(([type]) => type === 'Text')
    .map(([, value]) => value)
  assert.ok(text.includes('this is the heading'))
  assert.ok(text.includes('  const this true 123'))
  assert.ok(text.includes(' text'))
  assert.ok(text.includes('  after expression'))
  assert.ok(text.includes('Done'))
  assert.ok(
    tokens.some(([type, value]) => type === 'VariableName' && value === 'name')
  )
  assert.ok(
    tokens.some(
      ([type, value]) => type === 'LanguageConstant' && value === 'true'
    )
  )
  assert.ok(
    tokens.some(([type, value]) => type === 'String' && value === 'a > b')
  )
  assert.ok(
    tokens.some(([type, value]) => type === 'VariableName' && value === 'after')
  )
})

test('does not enter JSX children for generic calls or comparisons', () => {
  const tokens = getTokens('const result = foo<Bar>()\nconst less = a<b && c>d')
  assert.equal(
    tokens.some(([type]) => type === 'Text'),
    false
  )
})

test('recovers JSX highlighting after unfinished array declarations', () => {
  for (const declaration of [
    'const [todos, setTodos',
    'const [',
    'const [todos,',
  ]) {
    const source = `function TodoApp(){
${declaration}
  return <ul>
    <li>todo 1</li>
  </ul>
}
function App() {
  const [count, setCount] = useState(0)
  return <section id="center" />
}`
    const tokens = getTokens(source)
    assert.equal(
      tokens.filter(
        ([type, value]) => type === 'KeywordReturn' && value === 'return'
      ).length,
      2
    )
    assert.ok(
      tokens.some(([type, value]) => type === 'Text' && value === 'todo 1')
    )
    assert.deepEqual(
      getTagTokens(source)
        .filter(([type]) => type === 'TagName')
        .map(([, value]) => value),
      ['ul', 'li', 'li', 'ul', 'section']
    )
  }
})

test('preserves valid multiline array declarations', () => {
  const tokens = getTokens(`const [
  todos,
  setTodos
] = useState([])
const returnValue = todos`)
  assert.ok(
    tokens.some(
      ([type, value]) => type === 'VariableName' && value === 'setTodos'
    )
  )
  assert.ok(
    tokens.some(
      ([type, value]) => type === 'VariableName' && value === 'returnValue'
    )
  )
})

test('highlights TSX attributes like HTML while preserving expression variables', () => {
  const tokens = getTokens(`const className = 'heading'
const view = <header className="flex items-center">
  <Layout.Header
    className={className}
    disabled
    data-label="className"
    aria-hidden={true}
    {...props}
    title={format({ className })}
  />
  <h1 className='heading'>this is the heading</h1>
</header>`)
  assert.deepEqual(
    tokens
      .filter(([type]) => type === 'AttributeName')
      .map(([, value]) => value),
    [
      'className',
      'className',
      'disabled',
      'data-label',
      'aria-hidden',
      'title',
      'className',
    ]
  )
  assert.equal(
    tokens.filter(
      ([type, value]) => type === 'VariableName' && value === 'className'
    ).length,
    3
  )
  assert.ok(
    tokens.some(([type, value]) => type === 'String' && value === 'className')
  )
})
