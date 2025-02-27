import { execaCommand } from 'execa'
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const REPO = 'https://github.com/mattpocock/ts-reset'
const COMMIT = '22f39a8da0b7b180abbf0ded45c46db6feb33771'

const getTestName = (line) => {
  return (
    'ts-reset-' +
    line
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('/', '-')
      .replace('.d.ts', '')
  )
}

const getAllTests = async (folder) => {
  const dirents = await readdir(folder, { recursive: true })
  const allTests = []
  for (const dirent of dirents) {
    if (!dirent.endsWith('.d.ts')) {
      continue
    }
    const filePath = join(folder, dirent)
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
    await writeFile(`${root}/test/cases/${test.testName}.ts`, test.testContent)
  }
}

const main = async () => {
  process.chdir(root)
  await rm(`${root}/.tmp`, { recursive: true, force: true })
  await execaCommand(`git clone ${REPO} .tmp/ts-reset`, {
    stdio: 'inherit',
  })
  process.chdir(`${root}/.tmp/ts-reset`)
  await execaCommand(`git checkout ${COMMIT}`)
  process.chdir(root)
  const allTests = await getAllTests(`${root}/.tmp/ts-reset`)
  await writeTestFiles(allTests)
}

main()
