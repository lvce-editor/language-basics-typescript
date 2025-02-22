import { execaCommand } from 'execa'
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const REPO = 'https://github.com/rollup/rollup'
const COMMIT = 'b4cb7cccf1e770de72d49ffc47680172d34f963e'

const getTestName = (baseName) => {
  return (
    'rollup-' +
    baseName
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('/', '-')
      .replaceAll(',', '')
      .replaceAll('_', '-')
      .replaceAll('-.', '-')
  )
}

const getAllTests = async (folder) => {
  const dirents = await readdir(folder, { recursive: true })
  const allTests = []
  for (const dirent of dirents) {
    if (!dirent.endsWith('.ts') || dirent.endsWith('.d.ts')) {
      continue
    }
    const filePath = `${folder}/${dirent}`
    const fileContent = await readFile(filePath, 'utf8')
    const testName = getTestName(dirent)
    allTests.push({
      testName,
      testContent: fileContent,
    })
  }
  return allTests
}

const writeTestFiles = async (allTests) => {
  for (const test of allTests) {
    await writeFile(`${root}/test/cases/${test.testName}`, test.testContent)
  }
}

const main = async () => {
  process.chdir(root)
  await rm(`${root}/.tmp`, { recursive: true, force: true })
  await execaCommand(`git clone ${REPO} .tmp/rollup`, {
    stdio: 'inherit',
  })
  process.chdir(`${root}/.tmp/rollup`)
  await execaCommand(`git checkout ${COMMIT}`)
  process.chdir(root)
  const allTests = await getAllTests(`${root}/.tmp/rollup`)
  await writeTestFiles(allTests)
}

main()
