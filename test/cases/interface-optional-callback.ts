interface ProxyOptions {
  record: (message: ProxyMessage) => void
  report?: (error: unknown) => void
  resolve?: (id: number) => ProxyMessage;
  reset?: () => void
  enabled?: boolean
}

type Callbacks = {
  report?: (
    error: unknown,
  ) => void
  label: string
}

const ready = true
