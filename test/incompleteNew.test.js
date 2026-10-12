import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  initialLineState,
  TokenMap,
  tokenizeLine,
} from '../src/tokenizeTypeScript.js'

const tokenize = (source) => {
  let state = structuredClone(initialLineState)
  return source.split('\n').map((line) => {
    state = tokenizeLine(line, state)
    const tokens = []
    let offset = 0
    for (let index = 0; index < state.tokens.length; index += 2) {
      const type = TokenMap[state.tokens[index]]
      const length = state.tokens[index + 1]
      tokens.push([type, line.slice(offset, offset + length)])
      offset += length
    }
    assert.equal(offset, line.length)
    return tokens
  })
}

test('recovers after a standalone new and a following line comment', () => {
  const lines = tokenize(
    `const instance = new  \n// constructor to be added\nconst later = new Float32Array(9)`
  )

  assert.ok(
    lines[0].some(([type, text]) => type === 'KeywordNew' && text === 'new')
  )
  assert.ok(
    lines[1].some(([type, text]) => type === 'Comment' && text.startsWith('//'))
  )
  assert.ok(
    lines[2].some(([type, text]) => type === 'VariableName' && text === 'later')
  )
  assert.ok(
    lines[2].some(([type, text]) => type === 'Class' && text === 'Float32Array')
  )
})

test('recovers after an incomplete constructor name', () => {
  const lines = tokenize(
    `const instance = new Floa\n// finish the constructor\nconst later = 1`
  )

  assert.ok(
    lines[0].some(([type, text]) => type === 'Class' && text === 'Floa')
  )
  assert.ok(
    lines[1].some(([type, text]) => type === 'Comment' && text.startsWith('//'))
  )
  assert.ok(
    lines[2].some(([type, text]) => type === 'VariableName' && text === 'later')
  )
})

test('keeps constructor continuation after a comment following new', () => {
  const lines = tokenize(
    `const instance = new\n// constructor continues below\nFloat32Array(9)`
  )

  assert.ok(
    lines[2].some(([type, text]) => type === 'Class' && text === 'Float32Array')
  )
})
