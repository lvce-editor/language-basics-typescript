interface ComponentInfo {
  readonly editable: boolean
  readonly moduleId: string
  readonly uid: number
}

const components = (await Command.execute('ComponentState.getComponents')) as readonly ComponentInfo[]
const explorer = components.find((component) => component.moduleId === 'Explorer')
if (!explorer) {
  throw new Error(`Expected an Explorer component, got ${JSON.stringify(components)}`)
}
const explorerCard = Locator(`.ComponentStateCard[data-uid="${explorer.uid}"]`)
await expect(explorerCard).toBeVisible()
await expect(explorerCard.locator('.ComponentStateCardTitle')).toHaveText('Explorer')
