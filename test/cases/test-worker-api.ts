export interface CacheWorkerPageObject {
  readonly setCacheStorageItem: (
    request: CacheRequest,
    value: BodyInit,
    cacheName?: string,
    headers?: Readonly<Record<string, string>> | Readonly<Headers> | readonly (readonly [string, string])[],
    bucketName?: string,
    bucketOptions?: Readonly<StorageBucketOptions>,
  ) => Promise<CacheStorageWriteResult>
  readonly writeFile: (name: string, content: FileSystemWriteChunkType) => Promise<void>;
}

export interface DroppedFileHandle {
  readonly file: File;
  readonly id: number;
}

export interface ToolCallItemBase<TArguments, TName extends string> {
  readonly toolCall: {
    readonly arguments: TArguments;
    readonly name: TName;
  };
}
