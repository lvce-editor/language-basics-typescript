export const name = 'viewlet.editor-typescript-generic-function-type-alias'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/invoke.ts`
  const source = `type Invoke = <T>(method: string, ...args: readonly unknown[]) => Promise<T>

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const synchronizeSessions = async (connection: Connection, invoke: Invoke): Promise<void> => {
  const targetIds = await invoke<readonly string[]>('WorkerMemory.getTargets')
  const targets = new Set(targetIds)
}
const nextValue = 123
`
  await FileSystem.writeFile(filePath, source)
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(Locator('.Token.Type', { hasText: 'Invoke' })).toHaveText(
    'Invoke'
  )
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'string' })
  ).toHaveText('string')
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'unknown' })
  ).toHaveText('unknown')
  await expect(
    Locator('.Token.KeywordModifier', { hasText: 'readonly' })
  ).toHaveText('readonly')
  await expect(Locator('.Token.Class', { hasText: 'Promise' })).toHaveText(
    'Promise'
  )
  await expect(
    Locator('.Token.Comment', { hasText: 'eslint-disable-next-line' })
  ).toHaveCount(1)
  await expect(Locator('.Token.Function', { hasText: 'invoke' })).toHaveText(
    'invoke'
  )
  await expect(
    Locator('.Token.VariableName', { hasText: 'targets' })
  ).toHaveText('targets')
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
}
