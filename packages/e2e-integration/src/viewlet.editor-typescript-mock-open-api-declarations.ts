export const name = 'viewlet.editor-typescript-mock-open-api-declarations'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/api.d.ts`
  await FileSystem.writeFile(
    filePath,
    `interface MockOpenApi {
  readonly mockOpenApiRequestGetAll: () => Promise<readonly any[]>;
  readonly mockOpenApiRequestReset: () => Promise<void>;
  readonly mockOpenApiSetResponse: (items: readonly MockRequestInput[]) => Promise<void>;
  readonly mockOpenApiStreamFinish: () => Promise<void>;
  readonly mockOpenApiStreamPushChunk: (chunk: string) => Promise<void>;
  readonly mockOpenApiStreamReset: () => Promise<void>;
}

interface NextApi {
  readonly openAgentModePicker: () => Promise<void>;
}
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(
    Locator('.Token.KeywordModifier', { hasText: 'readonly' })
  ).toHaveCount(7)
  for (const name of [
    'mockOpenApiRequestGetAll',
    'mockOpenApiRequestReset',
    'mockOpenApiSetResponse',
    'mockOpenApiStreamFinish',
    'mockOpenApiStreamPushChunk',
    'mockOpenApiStreamReset',
    'openAgentModePicker',
  ]) {
    await expect(Locator('.Token.Function', { hasText: name })).toHaveText(name)
  }
  await expect(Locator('.Token.TypePrimitive', { hasText: 'any' })).toHaveText(
    'any'
  )
  await expect(
    Locator('.Token.Type', { hasText: 'MockRequestInput' })
  ).toHaveText('MockRequestInput')
  await expect(Locator('.Token.Class', { hasText: 'Promise' })).toHaveCount(7)
}
