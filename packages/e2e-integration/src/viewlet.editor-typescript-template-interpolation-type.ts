export const name = 'viewlet.editor-typescript-template-interpolation-type'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/template-interpolation.ts`
  await FileSystem.writeFile(
    filePath,
    'export const getData = (type: string, id: string): string => `${type}:${id}`\n' +
      '\n' +
      'export const getId = (type: string, value: string): string | undefined => {\n' +
      '  const prefix = `${type}:`\n' +
      '  return value.startsWith(prefix) ? value.slice(prefix.length) : undefined\n' +
      '}\n'
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.VariableName', { hasText: 'type' })).toHaveCount(
    3
  )
  await expect(Locator('.Token.VariableName', { hasText: 'id' })).toHaveCount(2)
  await expect(Locator('.Token.KeywordReturn')).toHaveText('return')
  await expect(
    Locator('.Token.Function', { hasText: 'startsWith' })
  ).toHaveText('startsWith')
  await expect(
    Locator('.Token.LanguageConstant', { hasText: 'undefined' })
  ).toHaveCount(2)
}
