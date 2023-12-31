import { markRaw, defineAsyncComponent } from "vue"

import PluginLoading from "@/components/Utils/PluginLoading.vue"
import PluginLoadError from "@/components/Utils/PluginLoadError.vue"

/**
 * 使用动态组件引入插件配置的组件
 */
export function importPluginComponent(folder: string, name: string) {
  return markRaw(
    defineAsyncComponent({
      loader: () => import(`./${folder}/${name}.vue`),
      loadingComponent: PluginLoading,
      errorComponent: PluginLoadError,
      delay: 200,
      timeout: 30000
    })
  )
}
