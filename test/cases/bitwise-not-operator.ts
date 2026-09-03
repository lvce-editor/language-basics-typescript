export const collapseReplace = (state: SearchState): SearchState => {
  const { flags, headerHeight } = state
  const newFlags = flags & ~SearchFlags.ReplaceExpanded
  return {
    ...state,
    flags: newFlags,
    headerHeight: GetHeaderHeightForFlags.getHeaderHeightForFlags(headerHeight, flags, newFlags),
  }
}
