interface RunAllTestsParams {
  browser: string
  commandMap: object
}

export const runAllTests = async ({
  browser,
  commandMap,
}: Readonly<RunAllTestsParams>): Promise<void> => {}
