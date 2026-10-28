import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScript.js'

const tokenize = (source) => {
  let state = structuredClone(initialLineState)
  return source.split('\n').map((line) => {
    state = tokenizeLine(line, state)
    const tokens = []
    let offset = 0
    for (let index = 0; index < state.tokens.length; index += 2) {
      const type = TokenMap[state.tokens[index]]
      const length = state.tokens[index + 1]
      tokens.push([type, line.slice(offset, offset + length)])
      offset += length
    }
    assert.equal(offset, line.length)
    return tokens
  })
}

test('recovers after an unmatched single quote', () => {
  const lines = tokenize(
    `const textColor = red'\nconst later = 1\n// comment\nconst text = 'valid'`
  )

  assert.ok(
    lines[1].some(([type, text]) => type === 'Keyword' && text === 'const')
  )
  assert.ok(
    lines[1].some(([type, text]) => type === 'VariableName' && text === 'later')
  )
  assert.ok(lines[2].some(([type]) => type === 'Comment'))
  assert.ok(
    lines[3].some(([type, text]) => type === 'String' && text === 'valid')
  )
})

for (const prefix of [
  "const text = 'unfinished",
  "const options = { label: 'unfinished",
  "const value = format('unfinished",
  "type Label = 'unfinished",
]) {
  test(`recovers after ${prefix}`, () => {
    const lines = tokenize(`${prefix}\n\nconst later = 42\n// comment`)
    assert.deepEqual(lines[1], [])
    assert.ok(
      lines[2].some(([type, text]) => type === 'Keyword' && text === 'const')
    )
    assert.ok(
      lines[2].some(
        ([type, text]) => type === 'VariableName' && text === 'later'
      )
    )
    assert.ok(
      lines[2].some(([type, text]) => type === 'Numeric' && text === '42')
    )
    assert.ok(lines[3].some(([type]) => type === 'Comment'))
  })
}

test('preserves escaped quotes and escaped newline continuations', () => {
  const lines = tokenize(
    "const text = 'it\\'s continued\\\ncontinued again\\\nlast'\nconst later = 42"
  )
  assert.ok(
    lines[0].some(([type, text]) => type === 'String' && text === "\\'")
  )
  assert.ok(
    lines[1].some(
      ([type, text]) => type === 'String' && text === 'continued again'
    )
  )
  assert.deepEqual(lines[2], [
    ['String', 'last'],
    ['Punctuation', "'"],
  ])
  assert.ok(
    lines[3].some(([type, text]) => type === 'VariableName' && text === 'later')
  )
})

test('recovers when an escaped newline is followed by an empty line', () => {
  const lines = tokenize("const text = 'continued\\\n\nconst later = 42")
  assert.ok(
    lines[2].some(([type, text]) => type === 'VariableName' && text === 'later')
  )
})

test('an escaped backslash does not continue an unterminated string', () => {
  const lines = tokenize("const text = 'unfinished\\\\\nconst later = 42")
  assert.ok(
    lines[1].some(([type, text]) => type === 'VariableName' && text === 'later')
  )
})
