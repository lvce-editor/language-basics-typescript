type RpcClient = {
  invoke: <T = unknown>(command: string, ...params: readonly unknown[]) => Promise<T>
  dispose: () => Promise<void>
}

const client: RpcClient = {
  invoke: async (command, ...params) => [command, ...params],
  dispose: async () => {},
}

export const call = (client: RpcClient): Promise<string> => client.invoke('ping')
