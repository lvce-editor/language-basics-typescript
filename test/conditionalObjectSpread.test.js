import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScript.js'

const getTokens = (source) => {
  let state = structuredClone(initialLineState)
  const tokens = []
  for (const line of source.split('\n')) {
    state = tokenizeLine(line, state)
    let offset = 0
    for (let i = 0; i < state.tokens.length; i += 2) {
      const length = state.tokens[i + 1]
      tokens.push([
        TokenMap[state.tokens[i]],
        line.slice(offset, offset + length),
      ])
      offset += length
    }
  }
  return tokens
}

for (const expression of [
  'applicationId !== undefined && { applicationId }',
  '\n    applicationId !== undefined && { applicationId }\n  ',
  'enabled ? { initial: true } : { initial: false }',
]) {
  test(`highlights conditional object spread: ${expression}`, () => {
    const tokens = getTokens(`export const create2 = (
  applicationId?: string,
): void => {
  const state: SourceControlState = {
    ...defaultState,
    ...(${expression}),
    initial: false,
  }
  SourceControlStates.set(state)
}`)
    assert.deepEqual(
      tokens.filter(([type]) => type === 'Text'),
      []
    )
    if (expression.includes('undefined')) {
      assert.ok(
        tokens.some(
          ([type, value]) =>
            type === 'LanguageConstant' && value === 'undefined'
        )
      )
    }
    assert.ok(
      tokens.some(
        ([type, value]) => type === 'LanguageConstant' && value === 'false'
      )
    )
    assert.ok(
      tokens.some(([type, value]) => type === 'Function' && value === 'set')
    )
  })
}
