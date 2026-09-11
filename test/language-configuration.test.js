import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const manifest = JSON.parse(
  await readFile(new URL('../extension.json', import.meta.url), 'utf8')
)

for (const id of ['typescript', 'typescriptreact']) {
  test(`${id} contributes indentation after an opening delimiter`, async () => {
    const language = manifest.languages.find((language) => language.id === id)
    const configuration = JSON.parse(
      await readFile(
        new URL(`../${language.configuration}`, import.meta.url),
        'utf8'
      )
    )
    const pattern = configuration.indentationRules.increaseIndentPattern
    assert.equal(typeof pattern, 'string')
    const regex = new RegExp(pattern)
    for (const line of [
      'function a(){',
      '  function a() {',
      'const Component = () => {',
      'if (value) { // comment',
      'const values = [',
      'call(',
    ]) {
      assert.equal(regex.test(line), true, line)
    }
    for (const line of [
      'function a() {}',
      'const values = []',
      'call()',
      '// function a(){',
      'const value = "{"',
      'return value',
      '}',
    ]) {
      assert.equal(regex.test(line), false, line)
    }
  })
}
