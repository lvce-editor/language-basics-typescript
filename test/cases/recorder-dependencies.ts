import type { ReplayStorage } from '../Storage/Storage.ts'
import type { RecordingOptions, ReplayEvent, RecordParams, Session, SessionMetadata, WorkerCommands, RecordingStatus } from '../Types/Types.ts'
import { bytes, maxEventBytes, maxSessionBytes, version } from '../Protocol/Protocol.ts'

interface RecorderDependencies {
  fetch?: typeof globalThis.fetch
  navigator?: Pick<Navigator, 'platform' | 'userAgent'>
  now?: () => number
  storage?: Pick<ReplayStorage, 'save'>
}

export const createRecorder = ({
  fetch: request = globalThis.fetch,
  navigator = globalThis.navigator,
  now = (): number => performance.now(),
  storage,
}: RecorderDependencies): Pick<WorkerCommands, 'start' | 'record' | 'flush' | 'status'> & { export: () => Session } => {
  let metadata: SessionMetadata
  let options: RecordingOptions
  const events: ReplayEvent[] = []
  const pending: ReplayEvent[] = []
  let size = 0
  let origin = 0
  let remote: { id: string; uploadToken: string } | undefined
  let uploadPromise: Promise<void> | undefined
  let lastError = ''
  let saved = 0
  let uploaded = 0
  const start = async (config: RecordingOptions): Promise<string> => {
    if (metadata) throw new Error('A session is already recording')
    options = config
    origin = now()
    metadata = {
      createdAt: new Date().toISOString(),
    }
  }
}
