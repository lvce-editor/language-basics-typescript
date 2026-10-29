export declare const dispose: () => Promise<void>, invoke: (method: string, ...params: readonly unknown[]) => Promise<any>
export declare const initializeRendererWorkerForWorker: (commandMap: Readonly<Record<string, (...args: any[]) => any>>) => Promise<void>
export declare const sendMessagePortToEditorWorker: (port: MessagePort, rpcId: number) => Promise<void>
declare const featureEnabled: boolean
declare let currentValue: RendererWorkerOptions
declare var firstHandler: () => void, secondHandler: (value: string) => void

// Keep declarations after nested function types in ordinary code.
export interface RendererWorkerOptions {
  readonly port: MessagePort
}
