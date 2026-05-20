const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }

export function escape(str) {
  if (str == null) return ""
  return String(str).replace(/[&<>"']/g, c => escapeMap[c])
}
