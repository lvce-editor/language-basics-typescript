const contents = Object.create(null) as Record<string, string>
const spaced = value as Record<string , string>
type Nested = Record<string, Map<string, string>>
type LinuxProcessStat = { pid: number }
type ProcessStatByPid = Record<number, LinuxProcessStat | undefined>
type ProcessStatsByParentPid = Record<
  number,
  LinuxProcessStat[] | undefined
>
const after = contents as Record<string, string>
const following = after === contents
