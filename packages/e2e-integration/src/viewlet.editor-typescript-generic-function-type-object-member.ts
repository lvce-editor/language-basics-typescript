export const name =
  'viewlet.editor-typescript-generic-function-type-object-member'

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
  const filePath = `${tmpDir}/helpers.ts`
  const source = `type RpcClient = {
  invoke: <T = unknown>(command: string, ...params: readonly unknown[]) => Promise<T>
  dispose: () => Promise<void>
}

export const assertEqual = (actual: unknown, expected: unknown, message: string): void => {
  const actualJson = JSON.stringify(actual)
  const expectedJson = JSON.stringify(expected)
  if (actualJson !== expectedJson) {
    throw new Error(\`\${message}: expected \${expectedJson}, got \${actualJson}\`)
  }
}

export const createRpc = async (url = new URL('.tmp/cacheWorkerMain.js', import.meta.url)): Promise<RpcClient> => {
  return ModuleWorkerRpcParent.create({ commandMap: {}, url: url.href })
}
`
  await FileSystem.writeFile(filePath, source)
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(
    Locator('.Token.VariableName', { hasText: 'command' })
  ).toHaveText('command')
  await expect(
    Locator('.Token.KeywordModifier', { hasText: 'readonly' })
  ).toHaveText('readonly')
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'unknown' })
  ).toHaveCount(3)
  await expect(Locator('.Token.Class', { hasText: 'Promise' })).toHaveCount(3)
  await expect(Locator('.Token.KeywordControl', { hasText: 'if' })).toHaveText(
    'if'
  )

  const genericLine = source.split('\n')[1]
  const genericDefaultColumn = genericLine.indexOf('unknown') + 'unknown'.length
  await Editor.setCursor(1, genericDefaultColumn)
  await Editor.type('[]')

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(Locator('.Token.Punctuation', { hasText: '[' })).toHaveText('[')
  await expect(Locator('.Token.KeywordControl', { hasText: 'if' })).toHaveText(
    'if'
  )
}
