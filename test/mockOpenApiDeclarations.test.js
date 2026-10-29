import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const source = await readFile(
  new URL('./cases/mock-open-api-declarations.ts', import.meta.url),
  'utf8'
)

for (const [language, tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${language} highlights readonly mock API function declarations`, () => {
    let state = structuredClone(tokenizer.initialLineState)
    const tokens = []

    for (const line of source.split('\n')) {
      state = tokenizer.tokenizeLine(line, state)
      let offset = 0
      for (let index = 0; index < state.tokens.length; index += 2) {
        const length = state.tokens[index + 1]
        tokens.push([
          tokenizer.TokenMap[state.tokens[index]],
          line.slice(offset, offset + length),
        ])
        offset += length
      }
      assert.equal(offset, line.length)
    }

    assert.deepEqual(
      tokens.filter(([type]) => type === 'Text'),
      []
    )
    for (const name of [
      'mockOpenApiRequestGetAll',
      'mockOpenApiRequestReset',
      'mockOpenApiSetResponse',
      'mockOpenApiStreamFinish',
      'mockOpenApiStreamPushChunk',
      'mockOpenApiStreamReset',
      'openAgentModePicker',
    ]) {
      assert.ok(
        tokens.some(([type, text]) => type === 'Function' && text === name),
        `${language} should classify ${name} as Function`
      )
    }
    for (const type of ['MockOpenApi', 'NextApi', 'MockRequestInput']) {
      assert.ok(
        tokens.some(
          ([tokenType, text]) => tokenType === 'Type' && text === type
        ),
        `${language} should classify ${type} as Type`
      )
    }
  })
}
