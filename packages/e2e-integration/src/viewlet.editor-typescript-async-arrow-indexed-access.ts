export const name = 'viewlet.editor-typescript-async-arrow-indexed-access'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/events.ts`
  await FileSystem.writeFile(
    filePath,
    `export const createEvent = async (
  type: Event["type"],
  details?: Record<string, string>,
): Promise<Event> => {
  return rpc.invoke("createEvent", {
    details,
    type,
  })
}
export const next = true
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.String', { hasText: 'type' })).toHaveText('type')
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'string' })
  ).toHaveCount(2)
  await expect(Locator('.Token.VariableName', { hasText: 'type' })).toHaveCount(
    2
  )
  await expect(
    Locator('.Token.LanguageConstant', { hasText: 'true' })
  ).toHaveText('true')
}
