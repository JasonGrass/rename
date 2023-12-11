import { reactive } from "vue"

import Handlers from "./HandlerAutoExport"

Handlers.sort((a, b) => a.sortHint - b.sortHint)

export default reactive({
  handlers: Handlers
})
