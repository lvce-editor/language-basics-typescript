export interface RpcMessage {
  error?: unknown
  id?: number | string
  method?: string
  params?: any[]
  result?: unknown
}

export interface ProxyMessage {
  connection: number
  direction: 'to-renderer' | 'from-renderer'
  label: string
  message: RpcMessage
  renderer: boolean
}

interface ProxyOptions {
  record: (message: ProxyMessage) => void
  report?: (error: unknown) => void
}

const wrapPorts = (
  value: unknown,
  replacePort: (port: MessagePort) => MessagePort,
  seen: { original: object; replacement: unknown }[] = [],
): unknown => {
  if (!value || typeof value !== 'object') return value
  const previous = seen.find((entry) => entry.original === value)
  if (previous) return previous.replacement
  if (value instanceof MessagePort) {
    const replacement = replacePort(value)
    seen.push({ original: value, replacement })
    return replacement
  }
  return value
}
