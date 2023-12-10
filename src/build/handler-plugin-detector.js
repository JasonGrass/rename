import { promises as fs } from "fs"
import path from "path"

/**
 * 自动从 plugins 目录中，找到所有 Handler 文件，并将其导入到 HandlerFactory.ts 文件中。实现 plugins 的自动发现。
 */
function handlerPluginDetector() {
  return {
    name: "handler-plugin-detector",
    buildStart: async (options) => {
      const srcPath = path.resolve(__dirname, "../")
      const pluginPath = path.resolve(srcPath, "plugins")

      console.log(srcPath)
      console.log(pluginPath)

      const pluginFiles = await detectPlugins(pluginPath)
      let code = await generateImportCode(pluginFiles)

      code = `/*
 * 此段代码在编译前自动生成，请勿修改。
 * 功能：自动检测 src/plugins 目录下的 Handler 文件，并将其导入到 HandlerFactory.ts 文件中。实现 plugins 的自动发现。
 */

import { reactive } from "vue"
${code}`

      const filePath = path.resolve(srcPath, "components/Operations/Handlers/", "HandlerFactory.ts")

      await fs.writeFile(filePath, code, "utf8")
      console.log("HandlerFactory.ts was generated!")
    }
  }
}

/**
 * 从插件目录中，找到所有处理重名的 Handler 文件
 */
async function detectPlugins(pluginSrc) {
  let dirs = await fs.readdir(pluginSrc)
  dirs = dirs.map((dir) => [dir, path.resolve(pluginSrc, dir)]) // [dirName, dirPath]

  const pluginFiles = []

  for (const [dirName, dirPath] of dirs) {
    const filesAndDirectories = await fs.readdir(dirPath, { withFileTypes: true })
    // 过滤出以 'Handler.ts' 结尾的文件
    const handlerFiles = filesAndDirectories
      .filter((file) => file.isFile() && file.name.endsWith("Handler.ts"))
      .map((file) => [dirName, file.name])

    pluginFiles.push(...handlerFiles)
  }
  return pluginFiles
}

async function generateImportCode(pluginsDir) {
  let importCode = ""

  for (const [pluginDirName, handlerFileName] of pluginsDir) {
    const fileNameWithoutExt = handlerFileName.slice(0, -3)
    importCode += `import ${fileNameWithoutExt} from "@/plugins/${pluginDirName}/${handlerFileName}"\n`
  }

  const arrayCode = pluginsDir
    .map(([_, handlerFile]) => handlerFile)
    .map((fileName) => fileName.slice(0, -3))
    .join(", ")

  return `
${importCode}
export default reactive({
  handlers: [${arrayCode}]
})
`
}

export default handlerPluginDetector
