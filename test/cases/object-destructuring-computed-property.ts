const getStringProperty = (value: unknown, property: string) => {
  if (value && typeof value === 'object' && property in value) {
    const { [property]: propertyValue } = value as Record<string, unknown>
    if (typeof propertyValue === 'string') {
      return propertyValue
    }
  }
  return undefined
}

const { [property]: propertyValue } = value
const { [keys[index]]: indexedValue } = value
const { [getKey()]: calledValue, other } = value
const { ['prefix' + property]: prefixedValue } = value
const {
  [property]: multilineValue,
} = value
const isOk = (result: unknown): result is CliLikeResult => {
  return Boolean(result && typeof result === 'object' && 'ok' in result)
}
