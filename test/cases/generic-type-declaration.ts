type ObjectWithProperty<Options extends string> = {
  [key in Options]: unknown
}
