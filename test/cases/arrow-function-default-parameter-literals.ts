const createRenderer = (
  setAsRendererProcess = true,
  isWorker = false,
  retries = 3,
  label = 'renderer',
) => ({ setAsRendererProcess, isWorker, retries, label })

const renderer = createRenderer()
