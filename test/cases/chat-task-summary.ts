import type {
  ChatActivityEvent,
  ChatAssistantMessageEvent,
  ChatChangedFile,
  ChatChangeEvent,
  ChatErrorEvent,
  ChatStatusEvent,
  ChatTask,
  ChatTaskEvent,
  ChatTaskStatus,
  ChatUserMessageEvent,
} from '../ChatApi/ChatApi.ts'

export interface ChatTaskSummary {
  readonly activities: readonly Extract<ChatTaskEvent, { type: 'activity' }>[]
  readonly changedFiles: readonly ChatChangedFile[]
  readonly checksPassed: number
  readonly errorMessage: string
  readonly messages: readonly (
    | Extract<ChatTaskEvent, { type: 'assistant-message' }>
    | Extract<ChatTaskEvent, { type: 'user-message' }>
  )[]
  readonly singleLineMessages: readonly (Extract<ChatTaskEvent, { type: 'assistant-message' }> | Extract<ChatTaskEvent, { type: 'user-message' }>)[]
}

let nextEventId = 1

export function createEvent(
  type: 'activity' | 'assistant-message' | 'user-message',
): ChatTaskEvent {
  return { id: nextEventId++, type } as ChatTaskEvent
}
