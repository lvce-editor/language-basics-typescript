interface Session {
  task?: string
  trace: string[]
  getTask?(): string
}

const createResult = (session?: Session) => {
  return {
    ...(session?.task && {
      task: session.task,
    }),
    value: session?.task ?? session.task,
    call: session?.getTask?.(),
    trace: session ? [...session.trace] : [],
  }
}

export { createResult }
