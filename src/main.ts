import { createApp } from "vue"
import "./style.css"
import "element-plus/dist/index.css"

import VXETable from "vxe-table"
import "vxe-table/lib/style.css"

import { createPinia } from "pinia"

import App from "./App.vue"

const pinia = createPinia()

createApp(App).use(pinia).use(VXETable).mount("#app")
