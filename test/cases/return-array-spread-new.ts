const getUniqueDepths = (
  visibleProcesses: readonly VisibleProcess[],
): readonly number[] => {
  return [...new Set(visibleProcesses.map((process) => process.depth))]
}

const values = [...items]
const property = [object.new]
const multiline = [
  ...new Set([]),
]
