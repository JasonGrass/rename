import { createApp } from "vue";
import "./style.css";
import "element-plus/dist/index.css";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import App from "./App.vue";

createApp(App).use(VXETable).mount("#app");
