import assert from 'node:assert/strict'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const getTokens = (Tokenizer, source) => {
  let lineState = structuredClone(Tokenizer.initialLineState)
  const tokens = []
  for (const line of source.split('\n')) {
    lineState = Tokenizer.tokenizeLine(line, lineState)
    let offset = 0
    for (let index = 0; index < lineState.tokens.length; index += 2) {
      const tokenType = Tokenizer.TokenMap[lineState.tokens[index]]
      const tokenLength = lineState.tokens[index + 1]
      tokens.push([tokenType, line.slice(offset, offset + tokenLength)])
      offset += tokenLength
    }
    assert.equal(offset, line.length)
  }
  return tokens
}

for (const [name, Tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${name} highlights template string interpolations`, () => {
    const tokens = getTokens(
      Tokenizer,
      'const value = `prefix ${visiblePort.port} count ${count + 1} suffix`\n' +
        'const escaped = `\\${notCode} ${value}`\n' +
        'const after = value'
    )

    assert.deepEqual(
      tokens.filter(([, text]) => text === '${'),
      [
        ['Punctuation', '${'],
        ['Punctuation', '${'],
        ['Punctuation', '${'],
      ]
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'VariableName' && text === 'visiblePort'
      )
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'port')
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'count')
    )
    assert.ok(tokens.some(([type, text]) => type === 'Numeric' && text === '1'))
    assert.ok(
      tokens.some(([type, text]) => type === 'String' && text === '\\$')
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'String' && text === '{notCode} ')
    )
    assert.equal(
      tokens.some(
        ([type, text]) => type === 'VariableName' && text === 'notCode'
      ),
      false
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'after')
    )
  })

  test(`${name} keeps an unfinished interpolation recoverable`, () => {
    const tokens = getTokens(
      Tokenizer,
      'const value = `prefix ${visiblePort.port\n' +
        '} suffix`\n' +
        'const after = value'
    )

    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'port')
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'String' && text === ' suffix')
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'after')
    )
  })

  test(`${name} restores arrow function highlighting after a typed template`, () => {
    const source =
      'export const getData = (type: string, id: string): string => `${type}:${id}`\n' +
      '\n' +
      'export const getId = (type: string, value: string): string | undefined => {\n' +
      '  const prefix = `${type}:`\n' +
      '  return value.startsWith(prefix) ? value.slice(prefix.length) : undefined\n' +
      '}'
    const tokens = getTokens(Tokenizer, source)

    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'type')
    )
    assert.ok(
      tokens.some(([type, text]) => type === 'VariableName' && text === 'id')
    )
    assert.equal(
      tokens.filter(([type, text]) => type === 'Punctuation' && text === '${')
        .length,
      3
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'KeywordReturn' && text === 'return'
      )
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'Function' && text === 'startsWith'
      )
    )
    assert.ok(
      tokens.some(
        ([type, text]) => type === 'LanguageConstant' && text === 'undefined'
      )
    )
  })
}
