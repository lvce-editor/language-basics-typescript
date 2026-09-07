const withDefault = (type = 1) => ({ type })
const withoutDefault = (type) => ({ type })
const withAnnotation = (type: string) => ({ type })
const withOptionalParameter = (type?: string) => ({ type })
function createNode(type = 1) {
  return { type }
}
