interface ContextMenuProps {
  readonly menuId: number
}

export const show = async <T extends ContextMenuProps>(
  uid: number,
  menuId: ContextMenuProps['menuId'],
  x: number,
  y: number,
  args: T,
): Promise<void> => {}
