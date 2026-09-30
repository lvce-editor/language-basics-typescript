const getWorkerRow = (
  worker: DisplayedWorker,
  showMemory: boolean,
  strings: typeof WorkersViewStrings,
  selected: boolean,
  hasFocus: boolean
): readonly VirtualDomNode[] => {
  const message = 'worker row'
  if (selected) {
    return [{ text: message, worker }]
  }
  return []
}
