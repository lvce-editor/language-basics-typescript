export const name = 'viewlet.editor-typescript-line-comment-in-parameters'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/line-comment-parameters.ts`
  const source = `const writeFile = async (
  name: string,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  content: FileSystemWriteChunkType,
): Promise<void> => {
  return content
}
function readFile(
  name: string,
  //
  encoding: string,
): Promise<string> {
  return name
}
const nextValue = 123
`
  await FileSystem.writeFile(filePath, source)
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(
    Locator('.Token.Comment', { hasText: 'eslint-disable-next-line' })
  ).toContainText('eslint-disable-next-line')
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'string' })
  ).toHaveCount(3)
  await expect(
    Locator('.Token.Type', { hasText: 'FileSystemWriteChunkType' })
  ).toHaveText('FileSystemWriteChunkType')
  await expect(Locator('.Token.KeywordReturn')).toHaveCount(1)
  await expect(Locator('.Token.Class', { hasText: 'Promise' })).toHaveCount(2)
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
}
