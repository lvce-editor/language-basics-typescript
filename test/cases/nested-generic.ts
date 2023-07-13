interface Init {
  (promise: Promise<unknown>, parent: Promise<unknown>): void;
}