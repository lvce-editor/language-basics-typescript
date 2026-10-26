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
      const type = TokenMap[state.tokens[index]]
      const length = state.tokens[index + 1]
      tokens.push([type, line.slice(offset, offset + length)])
      offset += length
    }
    assert.equal(offset, line.length)
    return tokens
  })
}

test('highlights literals in default parameters for functions and methods', () => {
  const tokens =
    tokenize(`const arrow = (enabled = true, disabled = false, count = 42, label = 'ready') => enabled
function create(enabled = true, disabled = false, count = 42, label = 'ready') {}
class Example {
  method(enabled = true, disabled = false, count = 42, label = 'ready') {}
}`)

  for (const literal of ['true', 'false']) {
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'LanguageConstant' && text === literal
      )
    )
  }
  assert.ok(tokens.some(([type, text]) => type === 'Numeric' && text === '42'))
  assert.ok(
    tokens.some(([type, text]) => type === 'String' && text === 'ready')
  )
  assert.ok(
    tokens.some(([type, text]) => type === 'VariableName' && text === 'enabled')
  )
  assert.ok(
    tokens.some(
      ([type, text]) => type === 'VariableName' && text === 'disabled'
    )
  )
})
