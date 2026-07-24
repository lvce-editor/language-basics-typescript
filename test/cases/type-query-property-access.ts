import type { MenuEntryId } from '@lvce-editor/constants'

interface ContextMenuPropsBase {
  readonly menuId: number
}

interface ContextMenuPropsExplorer extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Explorer
}

interface ContextMenuPropsIcon extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ExtensionDetailIconContextMenu
}
