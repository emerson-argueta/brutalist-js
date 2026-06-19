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

export function cardWithHeader(title, bodyHtml, actionsHtml = "") {
  return card(`
    <div class="card-header flex items-center justify-between">
      <h2 class="text-xs font-bold text-white uppercase tracking-wider">${escape(title)}</h2>
      ${actionsHtml ? `<div>${actionsHtml}</div>` : ""}
    </div>
    ${bodyHtml}`)
}

export function dividedList(rowsHtml) {
  return `<div class="divide-y-2 divide-black">${rowsHtml}</div>`
}

export function dataRow(leftHtml, rightHtml = "", attrs = "") {
  return `
    <div class="px-6 py-3 flex items-center justify-between" ${attrs}>
      <div>${leftHtml}</div>
      ${rightHtml ? `<div class="text-right">${rightHtml}</div>` : ""}
    </div>`
}

export function emptyState(message, icon = "") {
  return `
    <div class="p-12 text-center">
      ${icon ? `<p class="text-4xl mb-4">${icon}</p>` : ""}
      <p class="font-bold text-gray-500 uppercase text-sm tracking-wide">${escape(message)}</p>
    </div>`
}

export function inlineEmptyState(message) {
  return `<p class="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wide">${escape(message)}</p>`
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

export function progressBar(pct, color = "bg-black", { height = "h-2" } = {}) {
  const clamped = Math.min(100, Math.max(0, pct))
  return `
    <div class="${height} bg-gray-200 overflow-hidden">
      <div class="h-full ${color}" style="width: ${clamped.toFixed(1)}%"></div>
    </div>`
}

// ── Modal ──────────────────────────────────────────────────────────────────

export function modal(title, bodyHtml, { size = "sm", subtitle = "", error = "", scrollable = false, attrs = "" } = {}) {
  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", "2xl": "max-w-2xl" }
  const maxW = sizes[size] ?? "max-w-sm"
  const containerClass = `bg-white border-2 border-black w-full ${maxW}${scrollable ? " max-h-[85vh] flex flex-col" : ""}`
  const errorHtml = error ? `<div class="px-6 py-3 bg-red-50 border-b-2 border-red-600 text-red-700 text-sm font-bold">${escape(error)}</div>` : ""
  const body = scrollable ? `<div class="overflow-y-auto flex-1">${bodyHtml}</div>` : bodyHtml
  return `
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div class="${containerClass}" ${attrs}>
        <div class="flex items-center justify-between px-6 py-4 bg-black flex-shrink-0">
          <div>
            <h2 class="text-sm font-black text-white uppercase tracking-wider">${escape(title)}</h2>
            ${subtitle ? `<p class="text-xs text-gray-400 mt-0.5">${subtitle}</p>` : ""}
          </div>
          <button data-close-modal class="text-white hover:text-yellow-400 text-2xl leading-none p-1 font-black">&times;</button>
        </div>
        ${errorHtml}
        ${body}
      </div>
    </div>`
}

// ── Forms ──────────────────────────────────────────────────────────────────

export function formField(label, inputHtml) {
  return `<div><label class="label">${label}</label>${inputHtml}</div>`
}

export function formInput(attrs = "", extraClass = "") {
  const cls = extraClass ? `input ${extraClass}` : "input"
  return `<input class="${cls}" ${attrs}>`
}

export function formSelect(optionsHtml, attrs = "", extraClass = "") {
  const cls = extraClass ? `input ${extraClass}` : "input"
  return `<select class="${cls}" ${attrs}>${optionsHtml}</select>`
}

export function formTextarea(attrs = "", extraClass = "") {
  const cls = extraClass ? `input ${extraClass}` : "input"
  return `<textarea class="${cls}" ${attrs}></textarea>`
}

export function currencyInput(attrs = "") {
  return `<div class="money-input"><input type="number" step="0.01" min="0" class="input" ${attrs}></div>`
}

export function formCard(bodyHtml, { maxWidth = "max-w-md" } = {}) {
  return `<div class="${maxWidth} bg-white border-2 border-black p-6">${bodyHtml}</div>`
}

export function formActions(submitLabel, { cancelLabel = "Cancel", cancelHref = "", cancelAttrs = "", deleteLabel = "", deleteAttrs = "" } = {}) {
  let cancelBtn
  if (cancelHref) {
    cancelBtn = `<a href="${cancelHref}" data-navigate="${cancelHref}" class="btn-secondary">${cancelLabel}</a>`
  } else if (cancelAttrs) {
    cancelBtn = `<button type="button" class="btn-secondary" ${cancelAttrs}>${cancelLabel}</button>`
  } else {
    cancelBtn = `<button type="button" data-close-modal class="btn-secondary">${cancelLabel}</button>`
  }

  if (deleteLabel) {
    return `
      <div class="flex justify-between items-center pt-2">
        <button type="button" class="text-sm font-bold text-red-600 hover:text-black underline bg-transparent border-0 p-0 cursor-pointer" ${deleteAttrs}>${deleteLabel}</button>
        <div class="flex gap-2">${cancelBtn}<button type="submit" class="btn-primary">${submitLabel}</button></div>
      </div>`
  }
  return `
    <div class="flex justify-end gap-2 pt-2">
      ${cancelBtn}
      <button type="submit" class="btn-primary">${submitLabel}</button>
    </div>`
}

// ── Stat display ───────────────────────────────────────────────────────────

export function statLabel(text, extraClass = "") {
  return `<p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 ${extraClass}">${text}</p>`
}

export function statValue(value, colorClass = "text-black", size = "text-2xl") {
  return `<p class="${size} font-black ${colorClass}">${value}</p>`
}

// cells: array of { html, bg, id, wrapClass }
// When not gap-based, cells share a border-2 border-black outer wrapper with inner dividers.
// responsive: "sm" (grid-cols-1 sm:grid-cols-N), "md" (grid-cols-2 md:grid-cols-N), false (grid-cols-N)
export function statGrid(cells, { responsive = "sm", cols, mb = "mb-6", gap = 0, padding = "p-5" } = {}) {
  const numCols = cols || cells.length
  let gridCols
  if (!responsive) {
    gridCols = `grid-cols-${numCols}`
  } else if (responsive === "sm") {
    gridCols = `grid-cols-1 sm:grid-cols-${numCols}`
  } else {
    gridCols = `grid-cols-2 md:grid-cols-${numCols}`
  }
  const gapClass = gap ? `gap-${gap}` : ""
  const outerBorder = gap ? "" : "border-2 border-black"

  return `
    <div class="grid ${gridCols} ${outerBorder} ${gapClass} ${mb}">
      ${cells.map((cell, i) => {
        const isLast = i === cells.length - 1
        let divider = ""
        if (!gap) {
          divider = responsive === "sm"
            ? (isLast ? "" : "border-b-2 sm:border-b-0 sm:border-r-2 border-black")
            : responsive === "md"
            ? (isLast ? "" : "border-r-2 border-black")
            : (isLast ? "" : "border-r-2 border-black")
        }
        const cls = [cell.bg || "bg-white", divider, padding, cell.wrapClass || ""].filter(Boolean).join(" ")
        return `<div class="${cls}" ${cell.id ? `id="${cell.id}"` : ""}>${cell.html}</div>`
      }).join("")}
    </div>`
}

// ── Alert / banner ─────────────────────────────────────────────────────────

export function alertBanner(title, subtitleHtml = "", actionHtml = "", { color = "yellow" } = {}) {
  const bg = color === "red" ? "bg-red-500 text-white" : "bg-yellow-400"
  return `
    <div class="border-2 border-black ${bg} p-6 flex items-center justify-between">
      <div>
        <p class="font-black uppercase tracking-wide">${title}</p>
        ${subtitleHtml ? `<p class="text-sm mt-1 font-bold">${subtitleHtml}</p>` : ""}
      </div>
      ${actionHtml}
    </div>`
}

export function alertBox(content, { color = "yellow", padding = "p-6" } = {}) {
  const bg = color === "red" ? "bg-red-500 text-white" : "bg-yellow-400"
  return `<div class="border-2 border-black ${bg} ${padding}">${content}</div>`
}

export function badgeLink(text, href, { color = "bg-yellow-400", hoverColor = "hover:bg-white", attrs = "" } = {}) {
  return `<a href="${href}" data-navigate="${href}" class="text-xs font-black text-black ${color} px-3 py-2 border-2 border-black ${hoverColor}" ${attrs}>${escape(text)}</a>`
}

// ── Navigation ─────────────────────────────────────────────────────────────

// monthOptions: array of [label, value, selected]
export function monthNav(prevPath, monthOptions, nextPath) {
  const options = monthOptions.map(([label, value, selected]) =>
    `<option value="${value}"${selected ? " selected" : ""}>${label}</option>`
  ).join("")
  return `
    <div class="flex items-center gap-0 border-2 border-black">
      <a href="${prevPath}" data-navigate="${prevPath}"
         class="px-2 py-1 hover:bg-yellow-400 font-black text-sm border-r-2 border-black">&lt;</a>
      <select id="budget-month-select"
              class="px-3 py-1 text-sm font-bold bg-white focus:outline-none appearance-none cursor-pointer">
        ${options}
      </select>
      <a href="${nextPath}" data-navigate="${nextPath}"
         class="px-2 py-1 hover:bg-yellow-400 font-black text-sm border-l-2 border-black">&gt;</a>
    </div>`
}

export function scrollSentinel(id = "scroll-sentinel") {
  return `<div id="${id}" class="py-6 text-center text-xs font-bold text-gray-400 uppercase tracking-wide">Loading…</div>`
}

// ── Misc ───────────────────────────────────────────────────────────────────

export function iconBtn(icon, attrs = "", { hoverColor = "hover:text-black" } = {}) {
  return `<button class="text-gray-400 ${hoverColor} text-sm font-bold bg-transparent border-0 cursor-pointer" ${attrs}>${icon}</button>`
}

export function tableHeader(text) {
  return `<th class="px-6 py-3 text-left text-xs font-black uppercase tracking-wider">${text}</th>`
}

// headersHtml: concatenated <th> elements (use tableHeader())
// bodyAttrs / mobileAttrs: extra HTML attribute strings for the tbody / mobile div
export function dataTable(headersHtml, bodyHtml = "", mobileHtml = "", { bodyAttrs = "", mobileAttrs = "" } = {}) {
  return `
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full min-w-max">
        <thead>
          <tr class="border-b-2 border-black">${headersHtml}</tr>
        </thead>
        <tbody ${bodyAttrs}>${bodyHtml}</tbody>
      </table>
    </div>
    <div class="md:hidden divide-y-2 divide-black" ${mobileAttrs}>${mobileHtml}</div>`
}
