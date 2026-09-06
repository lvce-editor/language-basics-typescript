type Callbacks = {
  check: (predicate: () => boolean) => void;
  waitFor: (predicate: () => boolean, options?: Options) => Promise<void>;
  load: (options: Options) => Promise<Result>;
};

const ready = true;
// Highlighting continues after the callback properties.
export function isReady(): boolean {
  return ready;
}
