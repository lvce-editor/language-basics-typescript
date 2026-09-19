export const addAccurateSizes = (
  nodes: Uint32Array,
  nodeFields: readonly string[],
  nodeTypes: readonly string[],
  edges: Uint32Array,
  edgeFields: readonly string[],
  edgeTypes: readonly string[],
  firstEdgeIndexes: Uint32Array,
) => {
  const kUnvisited = 0xff_ff_ff_ff
  const kHasMultipleOwners = 0xff_ff_ff_fe
  const worklist: number[] = []
}
