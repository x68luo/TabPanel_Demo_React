# TabPanel Demo - React

A minimal but production‑ready starter that demonstrates an accessible **TabPanel** component with unit tests, built 
with React 18, Vite and Tailwind CSS v4.

---

## ✨ Tech Stack

| Area    | Choice                                  | Why                                                          |
| ------- |-----------------------------------------| ------------------------------------------------------------ |
| Bundler | **Vite**                                | Super‑fast dev server and HMR, first‑class ESM support       |
| UI      | **React 18**                            | Component model + Concurrent features                        |
| Styling | **Tailwind CSS v4**                     | Utility‑first, easy theming, no manual CSS cascade headaches |
| Testing | **Jest 29** + **React Testing Library** | DOM‑focused assertions, zero browser needed                  |
| Linting | **ESLint**                              | Consistent code style; Jest env enabled only for test files  |

---

## 🚀 Quick start

```bash
# 1 Clone / download this repo
$ git clone this repository

# 2 Install dependencies (Node >= 18 required)
$ npm install

# 3 Start the dev server
$ npm run dev   # opens http://localhost:5173 by default
```

### Scripts

| Command               | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Launches Vite dev server with HMR                        |
| `npm run build`       | Produces an optimised production bundle in `dist/`       |
| `npm run preview`     | Serves the built bundle locally to verify the prod build |
| `npm test`            | Runs Jest test suites once                               |
| `npm test -- --watch` | Re‑runs tests on file change                             |

### Running tests

```bash
# single run
npm test

# with coverage report
npm test -- --coverage
```

---

## 🗂️ Project layout

```
react‑vite‑playground/
│
├─ src/
│   ├─ components/
│   │   ├─ Heading.jsx
│   │   ├─ Paragraph.jsx
│   │   └─ TabPanel.jsx
│   ├─ App.jsx
│   ├─ main.jsx
│   └─ styles.css
├─ __tests__/        # Jest + RTL suites
│   ├─ Heading.test.jsx
│   ├─ Paragraph.test.jsx
│   └─ TabPanel.test.jsx
└─ ...config files
```

---

## Design choices & rationale

1. **Component isolation** – core UI split into `Heading`, `Paragraph`, and `TabPanel` so each can be tested independently and reused.
2. **Accessibility first** – `TabPanel` uses correct ARIA roles (`tablist`, `tab`, `tabpanel`) and keyboard navigation; headings ensure proper document hierarchy.
3. **Utility‑CSS +@apply** – Tailwind keeps markup short; common patterns (`rounded‑2xl`, borders, colours) centralised in `styles.css` via `@apply` for maintainability.
4. **Fast feedback loop** – Vite’s instant HMR plus Jest watch mode mean code / test / refresh cycles are sub‑second.
5. **Separation of concerns** – Business logic stays in components, global concerns (typography, colours) live in one CSS file, config lives at root.
6. **ESM everywhere** – Modern import/export syntax throughout; Babel config is CommonJS (`babel.config.cjs`) so Jest can load it synchronously.

---

## Extending the project

- Add new components under `src/components/` and co‑locate their tests in `__tests__/`.
- Tailwind theme tokens can be customised in `styles.css`.