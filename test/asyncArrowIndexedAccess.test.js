import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScript.js'

test('highlights an async arrow after indexed access and generic parameters', () => {
  const lines = `export const createEvent = async (
  type: Event["type"],
  details?: Record<string, string>,
): Promise<Event> => {
  return rpc.invoke("createEvent", {
    details,
    type,
  })
}
export const next = true`.split('\n')

  let state = structuredClone(initialLineState)
  const tokenized = lines.map((line) => {
    state = tokenizeLine(line, state)
    const tokens = []
    let offset = 0
    for (let index = 0; index < state.tokens.length; index += 2) {
      const length = state.tokens[index + 1]
      tokens.push([
        TokenMap[state.tokens[index]],
        line.slice(offset, offset + length),
      ])
      offset += length
    }
    assert.equal(offset, line.length)
    assert.equal(
      tokens.some(([type]) => type === 'Text'),
      false,
      line
    )
    return tokens
  })

  assert.ok(
    tokenized[1].some(([type, text]) => type === 'String' && text === 'type')
  )
  assert.equal(
    tokenized[2].filter(([type]) => type === 'TypePrimitive').length,
    2
  )
  assert.ok(
    tokenized[3].some(([type, text]) => type === 'Punctuation' && text === '=>')
  )
  assert.deepEqual(tokenized[6].slice(-2), [
    ['VariableName', 'type'],
    ['Punctuation', ','],
  ])
  assert.ok(
    tokenized[9].some(
      ([type, text]) => type === 'LanguageConstant' && text === 'true'
    )
  )
})
