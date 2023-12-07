import type { FileSystemFileHandle } from "wicg-file-system-access"

declare global {
  interface Window {
    showOpenFilePicker: typeof showOpenFilePicker
    showSaveFilePicker: typeof showSaveFilePicker
    showDirectoryPicker: typeof showDirectoryPicker
  }

  interface GlobalThis {
    showOpenFilePicker: typeof showOpenFilePicker
    showSaveFilePicker: typeof showSaveFilePicker
    showDirectoryPicker: typeof showDirectoryPicker
  }
}

declare global {
  interface FileSystemFileHandle {
    move: (string) => Promise<void>
  }
}
