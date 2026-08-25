import { executeCommand, exists, readAsObjectUrl, type ReadAsObjectUrlResult } from '@lvce-editor/api'
import { MediaFileNotFoundError } from '../MediaFileNotFoundError/MediaFileNotFoundError.ts'

type ReadAsObjectUrl = (uri: string) => Promise<ReadAsObjectUrlResult>
type ExecuteCommand = (id: string, ...args: readonly unknown[]) => Promise<unknown>
type Exists = (uri: string) => Promise<boolean>

const hasCustomFileSystemScheme = (uri: string): boolean => {
  return uri.includes('://') && !uri.startsWith('file://') && !uri.startsWith('http://') && !uri.startsWith('https://')
}

const isHttpUri = (uri: string): boolean => {
  return uri.startsWith('http://') || uri.startsWith('https://')
}

const getErrorProperty = (error: unknown, property: 'code' | 'status'): unknown => {
  return typeof error === 'object' && error !== null && property in error ? error[property] : undefined
}

const isNotFoundError = (error: unknown): boolean => {
  const code = getErrorProperty(error, 'code')
  const status = getErrorProperty(error, 'status')
  const message = error instanceof Error ? error.message : String(error)
  return code === 'E_NOT_FOUND' || code === 'ENOENT' || status === 404 || /\b(?:404|not found)\b/i.test(message)
}

export const getVideoUrl = async (
  uri: string,
  read: ReadAsObjectUrl = readAsObjectUrl,
  execute: ExecuteCommand = executeCommand,
  fileExists: Exists = exists,
): Promise<string> => {
  if (hasCustomFileSystemScheme(uri)) {
    try {
      return (await execute('Blob.getSrc', uri)) as string
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new MediaFileNotFoundError(uri)
      }
      throw error
    }
  }
  if (!isHttpUri(uri) && !(await fileExists(uri))) {
    throw new MediaFileNotFoundError(uri)
  }
  const result = await read(uri)
  if (!result.wasFound) {
    throw new MediaFileNotFoundError(uri)
  }
  return result.objectUrl
}
