import { reactive } from "vue"

import ReplaceHandler from "@/plugins/replace/ReplaceHandler"
import InsertHandler from "@/plugins/insert/InsertHandler"

export default reactive({
  handlers: [ReplaceHandler, InsertHandler]
})
