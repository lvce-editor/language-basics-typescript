export const remove = <T>(array: readonly T[], index: number, deleteCount: number): readonly T[] => {
  return array.toSpliced(index, deleteCount)
}
