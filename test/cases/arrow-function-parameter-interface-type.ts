import type { AboutState } from '../AboutState/AboutState.ts'
import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'

export const loadContent = async (context: AsyncCommandContext<AboutState>): Promise<void> => {
  await context.updateState()
}
