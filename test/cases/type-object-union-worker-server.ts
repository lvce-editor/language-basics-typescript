declare const self: DedicatedWorkerGlobalScope;
// Types
export type EncodedArgs = {
  type: "formdata" | "string";
  data: string;
};
export type Response =
  | { type: "ready" }
  | { type: "next"; requestId: string; value: Uint8Array }
  | { type: "done"; requestId: string }
  | { type: "throw"; requestId: string; error: string; stack?: string };

// State

type ServerModule = {
  default?: React.ComponentType | React.ReactNode;
  [key: string]: unknown;
};
let deployed: { manifest: ClientManifest; module: ServerModule } | null = null;
async function sendStream(
  requestId: string,
  getStream: () => ReadableStream<Uint8Array> | Promise<ReadableStream<Uint8Array>>,
): Promise<void> {
  try {
    const stream = await getStream();
    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      self.postMessage({ type: "next", requestId, value });
    }
    self.postMessage({ type: "done", requestId });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    const msg: Response = { type: "throw", requestId, error: error.message };
    if (error.stack) {
      msg.stack = error.stack;
    }
    self.postMessage(msg);
  }
}
