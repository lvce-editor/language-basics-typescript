const result = await rpc.invoke('HeapSnapshotParser.parse', content) as
  | {
      readonly type: 'validation-error'
      readonly message: string
    }
  | {
      readonly type: 'success'
      readonly value: ParsedHeapSnapshot
    }

if (result.type === 'validation-error') {
  throw new HeapSnapshotValidationError(result.message)
}

return result.value
