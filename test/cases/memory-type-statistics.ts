const getMemoryTypeName = (type: string): string => {
  return MemoryTypeNames[type] || (type ? `${type[0].toUpperCase()}${type.slice(1)}` : 'Other')
}

export const getStatisticsInternal = (
  nodes: Uint32Array,
  nodeFields: readonly string[],
  nodeTypes: readonly string[],
): Statistics => {
  const nodeFieldCount = nodeFields.length
  const selfSizeOffset = nodeFields.indexOf(NodeFieldType.SelfSize)
  const nodeTypeOffset = nodeFields.indexOf(NodeFieldType.Type)
  return nodeTypeOffset
}
const nextValue = 123
