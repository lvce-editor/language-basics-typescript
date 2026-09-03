const states = (await RendererWorker.invoke('Viewlet.getAllStates')) as Record<string, ViewletState>
const viewlets = Object.values(states)
