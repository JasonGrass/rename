import RenameHandlerBase from "@/lib/handler/RenameHandlerBase"
import { importPluginComponent } from "../component"

interface IJscodeConfiguration {
  code: string
}

class Handler extends RenameHandlerBase<IJscodeConfiguration> implements IRenameHandler {
  public title: string = "自定义 JS"
  public component: Component = importPluginComponent("./jscode/JscodeConfiguration.vue")
  public sortHint = 101

  protected doRename(ctx: IRenameContext, options: IJscodeConfiguration) {
    if (!options.code) {
      return
    }

    try {
      const func = Function("options", `return (${options.code}).apply(null, arguments)`)
      let result = func({
        name: this.getFileName(ctx),
        nameWithoutExt: ctx.name,
        extension: ctx.extension,
        modifyTime: ctx.file.modifyTime,
        size: ctx.file.size,
        index: ctx.file.index + 1
      })

      if (!result) {
        return
      }
      if (typeof result !== "string") {
        result = result.toString()
      }
      this.setFileName(ctx, result)
    } catch (err: any) {
      console.warn("[Jscode Handler] execute js code error", err)
    }
  }
}

export default new Handler()
