interface IRenameHandler {
  title: string
  component: Component
  rename<T>(options: T)
}

interface IReplaceHandlerOptions {
  from: string
  to: string
}
