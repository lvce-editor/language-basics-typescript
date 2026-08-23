import { RendererProcess } from '@lvce-editor/rpc-registry'

type DropDataFormat = 'file' | 'fileSystemHandle' | 'string'

export interface DropDataOptions {
  readonly formats: readonly DropDataFormat[]
  readonly includeElectronFilePaths: boolean
}

interface DropDataStringItem {
  readonly index: number
  readonly kind: 'string'
  readonly type: string
  readonly value: string
}

interface DropDataFileItem {
  readonly electronFilePath?: string
  readonly file?: File
  readonly fileSystemHandle?: FileSystemHandle
  readonly index: number
  readonly kind: 'file'
  readonly name: string
  readonly type: string
}

export type DropDataItem = DropDataFileItem | DropDataStringItem

export const getDropData = async (dropId: number, options: DropDataOptions): Promise<readonly DropDataItem[]> => {
  return RendererProcess.invoke('DropData.get', dropId, options)
}
