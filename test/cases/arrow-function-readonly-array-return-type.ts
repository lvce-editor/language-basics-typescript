export const getProblemsVirtualDom = (
  viewMode: number,
  problems: readonly VisibleProblem[],
  filterValue: string,
  message: string,
): readonly VirtualDomNode[] => {
  if (problems.length === 0 && message) {
    return [messageNode, text(message)]
  }
  if (problems.length === 0 && filterValue) {
    return getNoResultsWithFilterVirtualDom()
  }
  return getProblemsListVirtualDom(problems)
}
