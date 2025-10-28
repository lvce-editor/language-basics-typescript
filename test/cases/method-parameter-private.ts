interface Abc {
  add(private readonly srcName: string, private readonly target: string, readonly copy: boolean = false): void
}