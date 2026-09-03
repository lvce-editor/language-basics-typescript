export interface DeltaPercent {
  readonly handleOffset: number
  readonly percent: number
}

export const getNewDeltaPercent = (height: number, scrollBarHeight: number, relativeY: number): DeltaPercent => {
  const halfScrollBarHeight = scrollBarHeight / 2
  if (relativeY <= halfScrollBarHeight) {
    // clicked at top
    return {
      handleOffset: relativeY,
      percent: 0,
    }
  }
  if (relativeY <= height - halfScrollBarHeight) {
    // clicked in middle
    return {
      handleOffset: halfScrollBarHeight,
      percent: (relativeY - halfScrollBarHeight) / (height - scrollBarHeight),
    }
  }
  // clicked at bottom
  return {
    handleOffset: scrollBarHeight - height + relativeY,
    percent: 1,
  }
}
