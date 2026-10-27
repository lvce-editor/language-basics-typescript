export const name = 'viewlet.editor-typescript-generic-arrow-function-name'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/arrays.ts`
  await FileSystem.writeFile(
    filePath,
    `export const remove = <T>(array: readonly T[], index: number, deleteCount: number): readonly T[] => {
  return array.toSpliced(index, deleteCount)
}
const nextValue = 123
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(Locator('.Token.Function', { hasText: 'remove' })).toHaveText(
    'remove'
  )
  await expect(
    Locator('.Token.KeywordModifier', { hasText: 'readonly' })
  ).toHaveCount(2)
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'number' })
  ).toHaveCount(2)
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
}
