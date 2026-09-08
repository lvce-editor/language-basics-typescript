interface RecorderDependencies {
  now?: () => number
  storage?: Pick<ReplayStorage, 'save'>
}

export const ready = true
