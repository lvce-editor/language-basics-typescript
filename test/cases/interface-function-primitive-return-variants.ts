interface Callbacks {
  now: () => number;
  enabled?: () => boolean
  reset?: () => void;
  value?: () => string | undefined
  values?: () => number[]
  result?: () => Result
  storage?: Pick<Storage, 'save'>
}

type InlineCallbacks = { now?: () => number; storage?: Storage }

export const ready = true
