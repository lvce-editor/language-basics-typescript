export declare const dispose: () => Promise<void>, invoke: (method: string, ...params: readonly unknown[]) => Promise<any>
export declare const initializeRendererWorkerForWorker: (commandMap: Readonly<Record<string, (...args: any[]) => any>>) => Promise<void>
export declare const sendMessagePortToEditorWorker: (port: MessagePort, rpcId: number) => Promise<void>

// Keep declarations after nested function types in ordinary code.
export interface RendererWorkerOptions {
  readonly port: MessagePort
}
