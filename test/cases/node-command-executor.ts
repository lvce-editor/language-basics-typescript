const getWorkspacePath = async (
  getWorkspace: () => Promise<string>,
  getBuiltinModule: (id: string) => unknown,
): Promise<string> => {
  const workspace = await getWorkspace()
  if (!workspace) {
    throw new Error('Open a workspace before running a Bash command')
  }
  if (workspace.startsWith('file://')) {
    const { fileURLToPath } = getBuiltinModule('node:url') as {
      readonly fileURLToPath: typeof fileUrlToPath
    }
    return fileURLToPath(workspace)
  }
  return workspace
}
