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

test('highlights quoted object method names and resumes after their bodies', () => {
  const tokens = getTokens(`const views = [{ id: 'one', title: 'One' }]
const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  "ExtensionApi.getViewRegistrySnapshot"() {
    return { views }
  },
  label: 'plain property',
}
await WebWorkerRpcClient.create({ commandMap })`)

  assert.deepEqual(
    tokens.filter(([type]) => type === 'Text'),
    []
  )
  assert.equal(
    tokens.filter(
      ([type, value]) => type === 'String' && value.startsWith('ExtensionApi.')
    ).length,
    2
  )
  assert.equal(
    tokens.filter(
      ([type, value]) => type === 'KeywordReturn' && value === 'return'
    ).length,
    2
  )
  assert.ok(
    tokens.some(([type, value]) => type === 'KeywordAwait' && value === 'await')
  )
  assert.ok(
    tokens.some(
      ([type, value]) => type === 'String' && value === 'plain property'
    )
  )
})
