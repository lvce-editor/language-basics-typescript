export interface TestWorkerApi {
  readonly handleTableBodyContextMenu: (x: number, y: number) => Promise<void>
  readonly handleTableFocus: () => Promise<void>
  readonly handleTimelinePointerDown: (
    name: string,
    x: number,
    y: number,
  ) => Promise<void>
  readonly handleTimelinePointerMove: (x: number) => Promise<void>
  readonly handleTimelinePointerUp: (x: number) => Promise<void>
  readonly open: (sessionId: string) => Promise<void>
  readonly open2: ({ events, sessionId, useDevtoolsLayout }: OpenChatDebugOptions) => Promise<void>
  readonly reopenTab: (id: string) => Promise<void>
  readonly openTabHeaders: () => Promise<void>
  readonly openTabPayload: () => Promise<void>
}

export interface OpenChatDebugOptions {
  readonly events: readonly ChatDebugEvent[]
  readonly sessionId: string
  readonly useDevtoolsLayout: boolean
}

export interface ChatDebugEvent {
  readonly type: string
}
