export const name = 'viewlet.editor-typescript-multiline-typeof-parameters'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/worker-row.ts`
  const source = `const getWorkerRow = (
  worker: DisplayedWorker,
  showMemory: boolean,
  strings: typeof WorkersViewStrings,
  selected: boolean,
  hasFocus: boolean,
): readonly VirtualDomNode[] => {
  let className = 'WorkersViewWorkerRow'
  if (selected) {
    className += hasFocus ? ' focused' : ' blurred'
  }
  const cells: VirtualDomNode[] = [
    { className: 'WorkersViewWorkerCell', worker },
  ]
  return cells
}
const nextValue = 123
`
  await FileSystem.writeFile(filePath, source)
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(
    Locator('.Token.KeywordOperator', { hasText: 'typeof' })
  ).toHaveText('typeof')
  await expect(
    Locator('.Token.KeywordModifier', { hasText: 'readonly' })
  ).toHaveText('readonly')
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'boolean' })
  ).toHaveCount(3)
  await expect(
    Locator('.Token.Type', { hasText: 'VirtualDomNode' })
  ).toHaveCount(2)
  await expect(Locator('.Token.KeywordReturn')).toHaveCount(1)
  await expect(Locator('.Token.String')).toHaveCount(3)
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
}
