import type { DroppedItem } from '../DroppedItem/DroppedItem.ts'
import type { DroppedFile, DroppedItems } from '../DroppedItems/DroppedItems.ts'
import { getBrowserDroppedFile } from '../GetBrowserDroppedFile/GetBrowserDroppedFile.ts'
import { getElectronDroppedFile } from '../GetElectronDroppedFile/GetElectronDroppedFile.ts'
import { getRetainedUris } from '../GetRetainedUris/GetRetainedUris.ts'
import { isChromiumDragId } from '../IsChromiumDragId/IsChromiumDragId.ts'
import { parseUriList } from '../ParseUriList/ParseUriList.ts'

export const resolveDroppedItems = async (
  items: readonly DroppedItem[],
  itemIds: readonly number[],
  dropId: number,
  isElectron: boolean,
): Promise<DroppedItems> => {
  const files: DroppedFile[] = []
  const strings: string[] = []
  const uris: string[] = []
  let hasChromiumDragId = false
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    if (item.kind === 'string') {
      if (item.type === 'text/uri-list') {
        uris.push(...parseUriList(item.value))
      } else if (isChromiumDragId(item)) {
        hasChromiumDragId = true
      } else {
        strings.push(item.value)
      }
      continue
    }
    const file = isElectron ? await getElectronDroppedFile(item) : await getBrowserDroppedFile(item, itemIds[index], dropId)
    files.push(file)
    if (file.uri) {
      uris.push(file.uri)
    }
  }
  if (uris.length === 0 && hasChromiumDragId) {
    uris.push(...(await getRetainedUris()))
  }
  return { files, strings, uris }
}
