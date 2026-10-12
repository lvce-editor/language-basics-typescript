export const name = 'viewlet.editor-typescript-incomplete-new'

export const test = async ({
  Editor,
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/incomplete-new.ts`
  const source = `function create() {
  const instance =
  // finish the constructor
  const later = new Float32Array(9)
  const finalValue = 1
  return later
}
`
  await FileSystem.writeFile(filePath, source)
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await Editor.setCursor(1, '  const instance ='.length)
  await Editor.type(' new')

  await expect(Locator('.Token.KeywordNew')).toHaveCount(2)
  await expect(Locator('.Token.Comment')).toHaveCount(1)
  await expect(Locator('.Token.Keyword', { hasText: 'const' })).toHaveCount(3)
  await expect(
    Locator('.Token.VariableName', { hasText: 'later' })
  ).toHaveCount(2)
  await expect(Locator('.Token.Class', { hasText: 'Float32Array' })).toHaveText(
    'Float32Array'
  )
  await expect(Locator('.Token.Numeric', { hasText: '1' })).toHaveText('1')
  await expect(Locator('.Token.Text')).toHaveCount(0)
}
