export const name = 'viewlet.editor-typescript-object-literal-method-parameters'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/provider.ts`
  await FileSystem.writeFile(
    filePath,
    `const referenceProvider = {
  provideReferences(textDocument: { uri: string }, _offset: number) {
    return [{ uri: textDocument.uri, startRowIndex: 0 }]
  },
}
const label: string = 'plain string'
const count: number = 123
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'string' })
  ).toHaveCount(2)
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'number' })
  ).toHaveCount(2)
  await expect(
    Locator('.Token.String', { hasText: 'plain string' })
  ).toHaveText('plain string')
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
  await expect(Locator('.Token.KeywordReturn')).toHaveCount(1)
}
