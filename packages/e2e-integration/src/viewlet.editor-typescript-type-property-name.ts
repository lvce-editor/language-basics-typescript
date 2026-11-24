export const name = 'viewlet.editor-typescript-type-property-name'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/properties.ts`
  await FileSystem.writeFile(
    filePath,
    `const nodes = [
  {
    name: id,
    type: VirtualDomElements.Div,
  },
]
type Alias = string
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.VariableName', { hasText: 'type' })).toHaveText(
    'type'
  )
  await expect(
    Locator('.Token.VariableName', { hasText: 'VirtualDomElements' })
  ).toHaveText('VirtualDomElements')
  await expect(Locator('.Token.VariableName', { hasText: 'Div' })).toHaveText(
    'Div'
  )
  await expect(Locator('.Token.Keyword', { hasText: 'type' })).toHaveText(
    'type'
  )
  await expect(Locator('.Token.Type', { hasText: 'Alias' })).toHaveText('Alias')
}
