import { reactive } from "vue"

import ReplaceHandler from "./replace/ReplaceHandler"
import InsertHandler from "./insert/InsertHandler"

export default reactive({
  handlers: [ReplaceHandler, InsertHandler]
})
