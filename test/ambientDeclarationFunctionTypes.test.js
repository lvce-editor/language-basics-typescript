import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const source = await readFile(
  new URL('./cases/ambient-declaration-function-types.ts', import.meta.url),
  'utf8'
)

for (const [language, tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${language} highlights nested function types in ambient declarations`, () => {
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
    for (const [type, text] of [
      ['KeywordDeclare', 'declare'],
      ['KeywordModifier', 'readonly'],
      ['TypePrimitive', 'string'],
      ['TypePrimitive', 'unknown'],
      ['TypePrimitive', 'any'],
      ['Class', 'Promise'],
      ['Class', 'MessagePort'],
      ['Type', 'Readonly'],
      ['Type', 'Record'],
      ['VariableName', 'args'],
      ['VariableName', 'rpcId'],
      ['TypePrimitive', 'number'],
      ['Type', 'RendererWorkerOptions'],
    ]) {
      assert.ok(
        tokens.some((token) => token[0] === type && token[1] === text),
        `${language} should classify ${text} as ${type}`
      )
    }
  })
}
