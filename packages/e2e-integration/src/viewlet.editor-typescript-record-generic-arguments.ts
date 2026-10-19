export const name = 'viewlet.editor-typescript-record-generic-arguments'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/record.ts`
  await FileSystem.writeFile(
    filePath,
    `const contents = Object.create(null) as Record<string, string>
const nextValue = 123
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'string' })
  ).toHaveCount(2)
  await expect(Locator('.Token.Punctuation', { hasText: '<' })).toHaveText('<')
  await expect(Locator('.Token.Punctuation', { hasText: ',' })).toHaveText(',')
  await expect(Locator('.Token.Punctuation', { hasText: '>' })).toHaveText('>')
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
}
