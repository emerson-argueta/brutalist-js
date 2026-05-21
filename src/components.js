import { escape } from "./html.js"

export function pageHeader(title, actionsHtml = "") {
  return `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <h1 class="text-2xl font-black tracking-tight">${title}</h1>
      ${actionsHtml ? `<div class="flex flex-wrap items-center gap-2">${actionsHtml}</div>` : ""}
    </div>`
}

export function card(content) {
  return `<div class="card">${content}</div>`
}

export function cardHeader(title, actionsHtml = "") {
  return `
    <div class="card-header flex items-center justify-between">
      <h2 class="text-xs font-bold text-white uppercase tracking-wider">${escape(title)}</h2>
      <div>${actionsHtml}</div>
    </div>`
}

export function emptyState(message, icon = "") {
  return `
    <div class="p-12 text-center">
      ${icon ? `<p class="text-4xl mb-4">${icon}</p>` : ""}
      <p class="font-bold text-gray-500 uppercase text-sm tracking-wide">${escape(message)}</p>
    </div>`
}

export function flash(message, type = "notice") {
  const colors = type === "alert"
    ? "bg-red-100 border-red-500 text-red-800"
    : "bg-yellow-100 border-yellow-500 text-yellow-800"
  const container = document.getElementById("flash-container")
  if (!container) return
  container.innerHTML = `<div class="border-2 ${colors} px-4 py-3 font-bold text-sm">${escape(message)}</div>`
  setTimeout(() => { container.innerHTML = "" }, 4000)
}

export function badge(text, color = "bg-yellow-400") {
  return `<span class="text-xs font-black text-black ${color} px-3 py-1 border-2 border-black">${escape(text)}</span>`
}

export function progressBar(pct, color = "bg-black") {
  const clamped = Math.min(100, Math.max(0, pct))
  return `
    <div class="h-2 bg-gray-200 overflow-hidden">
      <div class="h-full ${color}" style="width: ${clamped.toFixed(1)}%"></div>
    </div>`
}
