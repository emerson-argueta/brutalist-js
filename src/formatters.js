export function formatCurrency(amount, currency = "USD") {
  if (amount == null) return "$0.00"
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
}

export function formatDate(dateStr, options = { month: "short", day: "numeric", year: "numeric" }) {
  if (!dateStr) return ""
  const [year, month, day] = dateStr.slice(0, 10).split("-")
  return new Date(+year, +month - 1, +day).toLocaleDateString("en-US", options)
}

export function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

export function monthLabel(month) {
  const [year, m] = month.split("-")
  return new Date(+year, +m - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" })
}
