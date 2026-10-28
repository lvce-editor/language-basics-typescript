export const name = 'viewlet.editor-typescript-unmatched-single-quote'

export const test = async ({
  Command,
  Editor,
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/single-quote.ts`
  const source = `const textColor = 'red'
const later = 42
// keep this comment
const text = 'valid'
`
  await FileSystem.writeFile(filePath, source)
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  const checkLaterLines = async (): Promise<void> => {
    await expect(Locator('.Token.Keyword', { hasText: 'const' })).toHaveCount(3)
    await expect(
      Locator('.Token.VariableName', { hasText: 'later' })
    ).toHaveText('later')
    await expect(Locator('.Token.Numeric', { hasText: '42' })).toHaveText('42')
    await expect(Locator('.Token.Comment')).toHaveCount(2)
    await expect(Locator('.Token.Comment', { hasText: '//' })).toHaveText('//')
    await expect(
      Locator('.Token.Comment', { hasText: 'keep this comment' })
    ).toHaveText(' keep this comment')
    await expect(Locator('.Token.String', { hasText: 'valid' })).toHaveText(
      'valid'
    )
  }
  await checkLaterLines()

  // Removing the opening quote reproduces the screenshot's trailing quote.
  await Editor.setCursor(0, "const textColor = '".length)
  await Command.execute('Editor.deleteLeft')
  await checkLaterLines()

  await Editor.type("'")
  await expect(Locator('.Token.String', { hasText: 'red' })).toHaveText('red')
  await checkLaterLines()

  // Opening the malformed source from disk must agree with incremental edits.
  const reopenedPath = `${tmpDir}/single-quote-reopened.ts`
  await FileSystem.writeFile(reopenedPath, source.replace("'red'", "red'"))
  await Main.openUri(reopenedPath)
  await checkLaterLines()
}
