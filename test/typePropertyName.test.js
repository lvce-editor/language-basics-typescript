import assert from 'node:assert/strict'
import { test } from 'node:test'
import * as TypeScript from '../src/tokenizeTypeScript.js'
import * as TypeScriptReact from '../src/tokenizeTypeScriptReact.js'

const lines = [
  'let dom: readonly VirtualDomNode[]',
  'if (isSelected) {',
  '  dom = [',
  '    {',
  '      name: id,',
  '      type: VirtualDomElements.Div,',
  '    },',
  '    { type: VirtualDomElements.Span },',
  '  ]',
  '}',
  'type Alias = string',
]

for (const [language, tokenizer] of [
  ['TypeScript', TypeScript],
  ['TSX', TypeScriptReact],
]) {
  test(`${language} highlights type properties in arrays of object literals`, () => {
    let state = tokenizer.initialLineState
    const tokensByLine = lines.map((line) => {
      state = tokenizer.tokenizeLine(line, state)
      const tokens = []
      let offset = 0
      for (let index = 0; index < state.tokens.length; index += 2) {
        const type = tokenizer.TokenMap[state.tokens[index]]
        const length = state.tokens[index + 1]
        if (type !== 'Whitespace') {
          tokens.push([type, line.slice(offset, offset + length)])
        }
        offset += length
      }
      assert.equal(offset, line.length)
      return tokens
    })

    assert.deepEqual(tokensByLine[5], [
      ['VariableName', 'type'],
      ['Punctuation', ':'],
      ['VariableName', 'VirtualDomElements'],
      ['Punctuation', '.'],
      ['VariableName', 'Div'],
      ['Punctuation', ','],
    ])
    assert.deepEqual(tokensByLine[7].slice(1, 6), [
      ['VariableName', 'type'],
      ['Punctuation', ':'],
      ['VariableName', 'VirtualDomElements'],
      ['Punctuation', '.'],
      ['VariableName', 'Span'],
    ])
    assert.deepEqual(tokensByLine[10], [
      ['Keyword', 'type'],
      ['Type', 'Alias'],
      ['Punctuation', '='],
      ['TypePrimitive', 'string'],
    ])
  })
}
