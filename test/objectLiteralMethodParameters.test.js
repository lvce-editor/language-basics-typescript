import assert from 'node:assert/strict'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const source = `const provider = {
  provideReferences(textDocument: { uri: string }, _offset: number) {
    return textDocument.uri
  },
}
const multilineProvider = {
  provideReferences(
    textDocument: {
      uri: string
    },
    _offset: number
  ) {
    return textDocument.uri
  },
}
const nextValue: string = 'string'
const nextNumber: number = 123
`

const tokenize = (tokenizer) => {
  let state = structuredClone(tokenizer.initialLineState)
  const tokens = []
  for (const line of source.split('\n')) {
    state = tokenizer.tokenizeLine(line, state)
    let offset = 0
    for (let index = 0; index < state.tokens.length; index += 2) {
      const type = tokenizer.TokenMap[state.tokens[index]]
      const length = state.tokens[index + 1]
      tokens.push([type, line.slice(offset, offset + length)])
      offset += length
    }
    assert.equal(offset, line.length)
  }
  return tokens
}

for (const [language, tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${language} highlights primitives in object-literal method parameters`, () => {
    const tokens = tokenize(tokenizer)
    assert.equal(
      tokens.filter(
        ([type, text]) => type === 'TypePrimitive' && text === 'string'
      ).length,
      3
    )
    assert.equal(
      tokens.filter(
        ([type, text]) => type === 'TypePrimitive' && text === 'number'
      ).length,
      3
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'String' && text === 'string')
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'Numeric' && text === '123')
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'KeywordReturn' && text === 'return'
      )
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'VariableName' && text === 'nextValue'
      )
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'VariableName' && text === 'nextNumber'
      )
    )
  })
}
