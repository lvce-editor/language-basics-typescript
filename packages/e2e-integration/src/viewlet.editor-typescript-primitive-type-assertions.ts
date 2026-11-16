export const name = 'viewlet.editor-typescript-primitive-type-assertions'

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
  const filePath = `${tmpDir}/assertions.ts`
  await FileSystem.writeFile(
    filePath,
    `await expect(item).toHaveCSS('mask-size', maskSizeRegex as unknown as string)
const later = 42
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  const checkAssertions = async (): Promise<void> => {
    await expect(
      Locator('.Token.TypePrimitive', { hasText: 'unknown' })
    ).toHaveText('unknown')
    await expect(
      Locator('.Token.TypePrimitive', { hasText: 'string' })
    ).toHaveText('string')
    await expect(
      Locator('.Token.KeywordControl', { hasText: 'as' })
    ).toHaveCount(2)
    await expect(
      Locator('.Token.VariableName', { hasText: 'maskSizeRegex' })
    ).toHaveText('maskSizeRegex')
    await expect(Locator('.Token.Numeric', { hasText: '42' })).toHaveText('42')
  }
  await checkAssertions()

  // Check highlighting after an edit on the same line.
  await Editor.setCursor(0, 'await '.length)
  await Editor.type(' ')
  await checkAssertions()
}
