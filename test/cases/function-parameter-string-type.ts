function update(doc: string) {}

export function createEditor(
  container: HTMLElement,
  doc: string,
  onChange: (doc: string) => void,
): EditorHandle {
  onChange(doc)
  const options = { doc: string }
  const text = 'doc: string'
  // doc: string
  return options
}

function optional(doc?: string, ...values: string[]) {}

function defaults(doc: string = 'doc: string', options = { doc: string }) {}

function multilineDefaults(
  options = {
    doc: string,
  },
  doc: string,
  count: number,
  enabled: boolean,
) {}

function afterDefaults(doc: string) {}
