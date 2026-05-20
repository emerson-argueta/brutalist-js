# brutalist-js

Vanilla JS component helpers and CSS for the Brutalist UI design system. The JS counterpart to [`brutalist_rails_ui`](https://github.com/emerson-argueta/brutalist_rails_ui).

No build step. No dependencies. Works with importmaps.

---

## Installation

### npm
```bash
npm install brutalist-js
```

### importmap (no bundler)
```json
{
  "imports": {
    "brutalist-js": "/path/to/brutalist-js/index.js"
  }
}
```

---

## CSS

Link the stylesheet in your HTML:

```html
<link rel="stylesheet" href="/path/to/brutalist-js/css/brutalist.css">
```

This gives you the component classes without needing a Tailwind build. You can use it alongside Tailwind or standalone.

### Available classes

| Class | Description |
|---|---|
| `.btn-primary` | Black filled button, yellow on hover |
| `.btn-secondary` | White outlined button, yellow on hover |
| `.btn-danger` | Red button |
| `.input` | Full-width bordered input |
| `.label` | Uppercase bold label |
| `.card` | White bordered card container |
| `.card-header` | Black header bar inside a card |
| `.table-brutal` | Full-width table with black header |
| `.money-input` | Input wrapper with `$` prefix |
| `.progress-bar` | Progress bar container |
| `.progress-bar-fill` | Progress bar fill element |

---

## JS Components

All functions return HTML strings for use in template literals.

```js
import { escape, formatCurrency, formatDate, pageHeader, card, emptyState } from "brutalist-js"
```

### `escape(str)`
HTML-escapes a string. Always use this on user-supplied data before interpolating into HTML.
```js
escape("<script>alert('xss')</script>")
// → "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
```

### `formatCurrency(amount, currency?)`
Formats a number as USD currency (or any ISO 4217 currency code).
```js
formatCurrency(1234.5)      // → "$1,234.50"
formatCurrency(99, "EUR")   // → "€99.00"
```

### `formatDate(dateStr, options?)`
Formats an ISO date string using `Intl.DateTimeFormat`.
```js
formatDate("2026-05-20")   // → "May 20, 2026"
```

### `currentMonth()`
Returns the current month as `"YYYY-MM"`.
```js
currentMonth()  // → "2026-05"
```

### `monthLabel(month)`
Formats a `"YYYY-MM"` string as a human-readable month.
```js
monthLabel("2026-05")  // → "May 2026"
```

### `pageHeader(title, actionsHtml?)`
Renders a page header with an optional right-side actions slot.
```js
pageHeader("Transactions", `<a href="/new" class="btn-primary">+ Add</a>`)
```

### `card(content)`
Wraps content in a bordered card.
```js
card(`<p class="p-6">Hello</p>`)
```

### `cardHeader(title, actionsHtml?)`
Black header bar for use inside a card.
```js
card(cardHeader("Recent Transactions", `<a href="/all">All →</a>`) + listHtml)
```

### `emptyState(message, icon?)`
Centered empty state with optional emoji icon.
```js
emptyState("No transactions yet.", "💸")
```

### `flash(message, type?)`
Inserts a flash message into `#flash-container` and auto-dismisses after 4 seconds. `type` is `"notice"` (default) or `"alert"`.
```js
flash("Saved successfully.")
flash("Something went wrong.", "alert")
```

Requires a `<div id="flash-container"></div>` in your layout.

### `badge(text, color?)`
Small bordered label. `color` is a Tailwind bg class, defaults to `"bg-yellow-400"`.
```js
badge("3 unassigned")
badge("Overdue", "bg-red-500")
```

### `progressBar(pct, color?)`
Renders a progress bar. `pct` is 0–100, `color` is a Tailwind bg class.
```js
progressBar(72)                    // 72% black bar
progressBar(110, "bg-red-600")     // clamped to 100%, red
```

---

## Full example

```js
import { escape, formatCurrency, pageHeader, card, cardHeader, emptyState, progressBar } from "brutalist-js"

function budgetView({ categories }) {
  const rows = categories.length
    ? categories.map(cat => `
        <div class="px-6 py-3 flex items-center justify-between">
          <span class="font-bold uppercase tracking-wide">${escape(cat.name)}</span>
          <span class="font-black">${formatCurrency(cat.spent)} / ${formatCurrency(cat.planned)}</span>
        </div>
        <div class="px-6 pb-3">${progressBar(cat.spent / cat.planned * 100)}</div>
      `).join("")
    : emptyState("No categories yet.", "📋")

  return `
    ${pageHeader("Budget", `<a href="/budget/new" class="btn-primary">+ Add Category</a>`)}
    ${card(cardHeader("May 2026") + rows)}
  `
}
```

---

## Rails counterpart

If you're building a Rails app, see [`brutalist_rails_ui`](https://github.com/emerson-argueta/brutalist_rails_ui) — the same design system as ERB helpers and CSS.

---

## License

MIT
