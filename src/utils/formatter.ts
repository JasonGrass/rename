export function formatFileSize(bytes: number): string {
  if (!bytes) {
    return "0";
  }

  const units = ["KB", "MB", "GB"];
  let unitIndex = 0;
  let fileSize = bytes / 1024; // Start with KB

  while (fileSize > 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }

  return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
}

export function formatDate(timestamp: number): string {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
