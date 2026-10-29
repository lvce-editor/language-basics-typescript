interface MockOpenApi {
  readonly mockOpenApiRequestGetAll: () => Promise<readonly any[]>;
  readonly mockOpenApiRequestReset: () => Promise<void>;
  readonly mockOpenApiSetResponse: (items: readonly MockRequestInput[]) => Promise<void>;
  readonly mockOpenApiStreamFinish: () => Promise<void>;
  readonly mockOpenApiStreamPushChunk: (chunk: string) => Promise<void>;
  readonly mockOpenApiStreamReset: () => Promise<void>;
}

interface NextApi {
  readonly openAgentModePicker: () => Promise<void>;
}
