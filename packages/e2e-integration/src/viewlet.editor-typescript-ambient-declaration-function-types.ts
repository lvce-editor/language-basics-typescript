export const name =
  'viewlet.editor-typescript-ambient-declaration-function-types'

export const test = async ({
  expect,
  FileSystem,
  Locator,
  Main,
  Settings,
  Workspace,
}): Promise<void> => {
  const tmpDir = await FileSystem.getTmpDir()
  const filePath = `${tmpDir}/RendererWorker.d.ts`
  await FileSystem.writeFile(
    filePath,
    `export declare const dispose: () => Promise<void>, invoke: (method: string, ...params: readonly unknown[]) => Promise<any>
export declare const initializeRendererWorkerForWorker: (commandMap: Readonly<Record<string, (...args: any[]) => any>>) => Promise<void>
export declare const sendMessagePortToEditorWorker: (port: MessagePort, rpcId: number) => Promise<void>
// Following declarations keep their own token classifications.
export interface RendererWorkerOptions { readonly port: MessagePort }
const nextValue = 123
`
  )
  await Settings.update({ 'editor.combineWhitespaceTokens': false })
  await Workspace.setUri(tmpDir)
  await Main.openUri(filePath)

  await expect(Locator('.Token.Text')).toHaveCount(0)
  await expect(
    Locator('.Token.KeywordDeclare', { hasText: 'declare' })
  ).toHaveCount(3)
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'string' })
  ).toHaveCount(2)
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'unknown' })
  ).toHaveText('unknown')
  await expect(Locator('.Token.TypePrimitive', { hasText: 'any' })).toHaveCount(
    3
  )
  await expect(
    Locator('.Token.TypePrimitive', { hasText: 'number' })
  ).toHaveText('number')
  await expect(Locator('.Token.Class', { hasText: 'MessagePort' })).toHaveCount(
    2
  )
  await expect(Locator('.Token.Type', { hasText: 'Readonly' })).toHaveText(
    'Readonly'
  )
  await expect(Locator('.Token.Type', { hasText: 'Record' })).toHaveText(
    'Record'
  )
  await expect(Locator('.Token.VariableName', { hasText: 'rpcId' })).toHaveText(
    'rpcId'
  )
  await expect(Locator('.Token.Numeric', { hasText: '123' })).toHaveText('123')
}
