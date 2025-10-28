import { execaCommand } from 'execa'
import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const REPO = 'https://github.com/babel/babel'
const COMMIT = 'c25b64ae612b6eefd2a9681c56a4924a61113003'

const getTestName = (baseName) => {
  return (
    'babel-parser-' +
    baseName
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('/', '-')
      .replaceAll(',', '')
      .replaceAll('_', '-')
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
  await execaCommand(`git clone ${REPO} .tmp/babel`, {
    stdio: 'inherit',
  })
  process.chdir(`${root}/.tmp/babel`)
  await execaCommand(`git checkout ${COMMIT}`)
  process.chdir(root)
  await cp(
    `${root}/.tmp/babel/packages/babel-parser/src`,
    `${root}/.tmp/babel-parser-src`,
    {
      recursive: true,
    }
  )
  const allTests = await getAllTests(`${root}/.tmp/babel-parser-src`)
  await writeTestFiles(allTests)
}

main()
