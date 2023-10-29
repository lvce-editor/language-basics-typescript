import got from 'got'
import { createReadStream, createWriteStream } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path, { dirname, join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import { createGunzip } from 'node:zlib'
import tar from 'tar-fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const URL = 'https://registry.npmjs.org/@types/node/-/node-20.4.1.tgz'

const getTestName = (line) => {
  return (
    'types-node-' +
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

const download = async (url, outPath) => {
  await pipeline(got.stream(url), createWriteStream(outPath))
}

const extractTarGz = async (inFile, outDir) => {
  await mkdir(outDir, { recursive: true })
  await pipeline(
    createReadStream(inFile),
    createGunzip(),
    tar.extract(outDir, {
      strip: 1,
    })
  )
}

const main = async () => {
  process.chdir(root)
  await rm(`${root}/.tmp`, { recursive: true, force: true })
  await mkdir(`${root}/.tmp`, { recursive: true })
  await download(URL, `${root}/.tmp/types-node.tgz`)
  await extractTarGz(`${root}/.tmp/types-node.tgz`, `${root}/.tmp/types-node`)
  await rm(`${root}/.tmp/types-node/ts4.8`, { recursive: true, force: true })
  process.chdir(root)
  const allTests = await getAllTests(`${root}/.tmp/types-node`)
  await writeTestFiles(allTests)
}

main()
