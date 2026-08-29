interface CoverageMap {}
interface JavascriptCoverageEntry {}

const addEntryToCoverageMap = async (
  coverageMap: CoverageMap,
  entry: JavascriptCoverageEntry,
): Promise<void> => {}

export const createJavascriptCoverage = async (
  entries: readonly JavascriptCoverageEntry[],
): Promise<CoverageMap> => {
  return {}
}
