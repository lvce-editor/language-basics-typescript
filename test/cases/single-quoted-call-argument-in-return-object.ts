export const loadConfig = () => {
  return {
    commit: getString(config, 'commit'),
  }
}
