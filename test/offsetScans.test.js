import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScript.js'

const tokenize = (source) => {
  let state = structuredClone(initialLineState)
  const result = []
  for (const line of source.split('\n')) {
    state = tokenizeLine(line, state)
    let offset = 0
    for (let index = 0; index < state.tokens.length; index += 2) {
      const length = state.tokens[index + 1]
      result.push([
        TokenMap[state.tokens[index]],
        line.slice(offset, offset + length),
      ])
      offset += length
    }
    assert.equal(offset, line.length)
  }
  return result
}

test('preserves parameter and generic type classifications across scan fast paths', () => {
  const tokens = tokenize(`const value = 1
function first(value: number) {}
const plain = value
const table: Map<string, User> = new Map()
const identity = (value: User): User => value
/* open
comment */
function last(value: boolean) {}`)
  assert.ok(
    tokens.some(([type, text]) => type === 'TypePrimitive' && text === 'number')
  )
  assert.ok(
    tokens.some(
      ([type, text]) => type === 'TypePrimitive' && text === 'boolean'
    )
  )
  assert.ok(tokens.some(([type, text]) => type === 'Type' && text === 'User'))
  assert.ok(
    tokens.some(
      ([type, text]) => type === 'Comment' && text.includes('comment')
    )
  )
})
