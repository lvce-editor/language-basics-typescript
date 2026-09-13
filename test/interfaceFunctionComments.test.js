import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const source = await readFile(
  new URL('./cases/interface-function-comments.ts', import.meta.url),
  'utf8'
)

for (const [language, tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${language} preserves comments and declarations after function properties`, () => {
    let state = structuredClone(tokenizer.initialLineState)
    const tokens = []
    for (const line of source.split('\n')) {
      state = tokenizer.tokenizeLine(line, state)
      let offset = 0
      for (let i = 0; i < state.tokens.length; i += 2) {
        const length = state.tokens[i + 1]
        tokens.push([
          tokenizer.TokenMap[state.tokens[i]],
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
    assert.equal(
      tokens.filter(
        ([type, text]) => type === 'Comment' && text.includes('@deprecated')
      ).length,
      4
    )
    for (const name of [
      'click',
      'dispatchEvent',
      'first',
      'hover',
      'locator',
      'nth',
      'type',
    ]) {
      assert.ok(
        tokens.some(([type, text]) => type === 'Function' && text === name)
      )
    }
    assert.ok(
      tokens.some(([type, text]) => type === 'Type' && text === 'UpdateConfig')
    )
  })
}
