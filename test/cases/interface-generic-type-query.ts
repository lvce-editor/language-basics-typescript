interface Session {
  disposed: boolean
  fixtureRecording: FixtureRecording | undefined
  fixtureReplay: FixtureReplay | undefined
  fundedConfiguration: BackendVoiceConfiguration | undefined
  fundedConfigurationRefreshTimeout: ReturnType<typeof setTimeout> | undefined
  fundedControlSocket: WebSocket | undefined
  fundedSocketIntentionalClose: boolean
  readonly handledToolCallIds: Set<string>
  readonly id: number
  readonly isTestMode: boolean
  state: VoiceSessionState
}

const sessions = new Map<number, Session>()
