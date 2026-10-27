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

test('highlights names of generic arrow functions without type assertions', () => {
  const tokens =
    tokenize(`export const remove = <T>(array: readonly T[], index: number, deleteCount: number): readonly T[] => {
  return array.toSpliced(index, deleteCount)
}
const asyncRemove = async <T>(array: readonly T[]) => array
const asserted = <ReadonlyArray<string>>(strings)
const ordinary = 1`)

  assert.ok(
    tokens.some(([type, text]) => type === 'Function' && text === 'remove')
  )
  assert.ok(
    tokens.some(([type, text]) => type === 'Function' && text === 'asyncRemove')
  )
  assert.ok(
    tokens.some(
      ([type, text]) => type === 'VariableName' && text === 'asserted'
    )
  )
  assert.ok(
    tokens.some(
      ([type, text]) => type === 'VariableName' && text === 'ordinary'
    )
  )
})
