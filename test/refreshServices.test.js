import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const source = await readFile(
  new URL('./cases/refresh-services.ts', import.meta.url),
  'utf8'
)

for (const [language, tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${language} highlights nested RefreshServices types and following code`, () => {
    let state = structuredClone(tokenizer.initialLineState)
    const tokens = []
    const tokensByLine = []
    for (const [lineIndex, line] of source.split('\n').entries()) {
      state = tokenizer.tokenizeLine(line, state)
      let offset = 0
      const lineTokens = []
      for (let index = 0; index < state.tokens.length; index += 2) {
        const type = tokenizer.TokenMap[state.tokens[index]]
        const length = state.tokens[index + 1]
        const token = [type, line.slice(offset, offset + length)]
        tokens.push(token)
        lineTokens.push(token)
        offset += length
      }
      tokensByLine[lineIndex] = lineTokens
      assert.equal(offset, line.length)
    }

    assert.ok(
      tokens.some(
        ([type, text]) => type === 'Function' && text === 'getMemoryUsages'
      )
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'Type' && text === 'ReadonlyMap')
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'Function' && text === 'getWorkers'
      )
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'Type' && text === 'TrackedWorker')
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'KeywordModifier' && text === 'readonly'
      )
    )
    assert.ok(
      tokensByLine[18].some(
        ([type, text]) => type === 'TypePrimitive' && text === 'number'
      )
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'VariableName' && text === 'displayedWorkers'
      )
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'KeywordModifier' && text === 'async'
      )
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'Function' && text === 'refresh')
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'KeywordReturn' && text === 'return'
      )
    )
  })
}
