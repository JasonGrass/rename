/*
 * 此段代码在编译前自动生成，请勿修改。
 * 功能：自动检测 src/plugins 目录下的 Handler 文件，并将其导入到 HandlerFactory.ts 文件中。实现 plugins 的自动发现。
 */

import InsertHandler from "@/plugins/insert/InsertHandler.ts"
import JscodeHandler from "@/plugins/jscode/JscodeHandler.ts"
import PadHandler from "@/plugins/pad-number/PadHandler.ts"
import RegexHandler from "@/plugins/regex/RegexHandler.ts"
import ReplaceHandler from "@/plugins/replace/ReplaceHandler.ts"

export default [InsertHandler, JscodeHandler, PadHandler, RegexHandler, ReplaceHandler]
