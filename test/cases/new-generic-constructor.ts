const renderers = new WeakMap<Document | HTMLElement, FrameRenderer>()
const renderer = new Container<FrameRenderer>(frame)
const nested = new Map<Document, Array<FrameRenderer>>()
const intersection = new Container<Document & FrameRenderer>()
const spaced = new Container /* types */ <FrameRenderer>()
const multiline = new WeakMap<
  Document | HTMLElement,
  FrameRenderer
>()
const plain = new Container
const value = frame < limit ? frame : limit
const after = new Container<FrameRenderer>(frame).get(frame)
const callbacks = new Map<Document, (reason: Error) => void>()
const constructors = new Map<string, new (...args: any[]) => FrameRenderer>()
const handlers = new Map<keyof typeof rendererHandlers, FrameRenderer>()
const tuples = new Map<Document, [renderer: FrameRenderer, active?: boolean]>()
