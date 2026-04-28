# DEVELOPMENT PLAN: calculadora-v14

## 1. ARCHITECTURE OVERVIEW

**Project Type:**  
Frontend-only SPA (Single Page Application) — React 18, JavaScript ES6+, Vite, CSS3, HTML5, Jest, Netlify.

**Folder Structure (per SPEC.md):**
```
calculadora-v14/
├── .gitignore
├── .env.example
├── README.md
├── docker-compose.yml
├── run.sh
├── netlify.toml
├── package.json
├── vite.config.js
├── public/
│   └── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Calculator.jsx
│   │   ├── ResultDisplay.jsx
│   │   └── OperationForm.jsx
│   ├── hooks/
│   │   └── useCalculator.js
│   ├── types/
│   │   ├── OperationInput.js
│   │   └── OperationResult.js
│   ├── styles/
│   │   └── calculator.css
│   └── __tests__/
│       ├── Calculator.test.jsx
│       └── useCalculator.test.js
└──
```

**Key Components:**
- **Calculator.jsx:** Main calculator UI, manages state and renders form/result.
- **OperationForm.jsx:** Numeric and operation buttons, input handling.
- **ResultDisplay.jsx:** Shows result or error.
- **useCalculator.js:** Custom React hook for all calculator logic and state.
- **calculator.css:** Responsive, touch-friendly styling.
- **OperationInput.js / OperationResult.js:** JSDoc typedefs for data contracts.
- **Tests:** Jest tests for Calculator and useCalculator.

**Business Logic:**
- Only addition and subtraction.
- Input via on-screen buttons (0-9, decimal point).
- Integer arithmetic for precision (avoiding floating-point errors).
- Responsive and accessible UI.
- No backend; all logic is client-side.

**Deployment:**
- Netlify (static hosting).
- CI/CD via Netlify (auto-deploy on push).
- Environment variables for app title, environment, Netlify site ID.

---

## 2. ACCEPTANCE CRITERIA

1. **Functional Calculator:**  
   Users can input numbers (0-9, decimal), select addition or subtraction, and get precise results (up to 10 decimals) using only the on-screen interface.
2. **Error Handling & Validation:**  
   The calculator prevents invalid input (multiple decimals, non-numeric), displays clear error messages, and allows users to reset or correct input (C, ⌫).
3. **Responsive & Accessible UI:**  
   The calculator is fully usable on desktop and mobile, with all buttons at least 44x44px, no horizontal scroll, and touch/mouse support.
4. **Testing & Quality:**  
   All core logic and UI components are covered by Jest tests, including both correct calculations and error cases.
5. **Deployment & Availability:**  
   The SPA is deployed on Netlify, loads in <2s on 3G, and is accessible via a public HTTPS URL with no login or registration.

---

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
Every executable item MUST include exactly one line at the end of the item block (after Validation):
**Role:** <role_id> (<category>)

- role-tl (technical_lead): Foundation (shared types, contracts)
- role-fe (frontend_developer): All frontend logic, UI, hooks, tests
- role-devops (devops_support): Infrastructure, deployment, CI/CD, documentation

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared data contracts, typedefs, and CSS

**Goal:**  
Create all shared code and contracts required by the calculator SPA, including JSDoc typedefs for OperationInput and OperationResult, and the calculator CSS file. These files are imported by hooks, components, and tests.

**Files to create:**
- src/types/OperationInput.js (create) — JSDoc typedef for OperationInput
- src/types/OperationResult.js (create) — JSDoc typedef for OperationResult
- src/styles/calculator.css (create) — Calculator-specific CSS (responsive, touch-friendly, min 44x44px buttons, no horizontal scroll)

**Tests required:**  
N/A (typedefs and CSS only)

**Dependencies:**  
None

**Validation:**  
- All typedefs are referenced via JSDoc in logic and components.
- CSS is imported in Calculator.jsx and applies correct styles (buttons, layout, responsive).

**Role:** role-tl (technical_lead)

---

### ITEM 2: Frontend Core — React entry, root, and calculator logic

**Goal:**  
Implement the React SPA entry point, root component, and the custom calculator hook with all business logic (input handling, validation, integer arithmetic for precision, error handling, state management).

**Files to create:**
- src/main.jsx (create) — React entry point, renders <App /> into #root
- src/App.jsx (create) — Root component, renders <Calculator />
- src/hooks/useCalculator.js (create) — Custom React hook for calculator logic and state (per SPEC.md: state, setters, calculate, reset, error handling, integer arithmetic for precision)

**Tests required:**  
- src/__tests__/useCalculator.test.js (create) — Jest tests for useCalculator (happy path: correct calculation, error path: invalid input, multiple decimals, etc.)

**Dependencies:**  
Item 1

**Validation:**  
- `npm run test` passes all useCalculator tests.
- App renders without error; useCalculator provides correct state and logic.

**Role:** role-fe (frontend_developer)

---

### ITEM 3: Frontend UI — Calculator, OperationForm, ResultDisplay components

**Goal:**  
Implement all UI components for the calculator, including the main Calculator container, the OperationForm (numeric and operation buttons, input display), and the ResultDisplay (shows result or error, reset button). All components use props and state as defined in SPEC.md.

**Files to create:**
- src/components/Calculator.jsx (create) — Main calculator UI, manages state via useCalculator, renders OperationForm and ResultDisplay, imports calculator.css
- src/components/OperationForm.jsx (create) — Form for entering numbers and selecting operation (buttons 0-9, ., +, -, =, C, ⌫), handles input via props
- src/components/ResultDisplay.jsx (create) — Displays calculation result or error, provides reset button

**Tests required:**  
- src/__tests__/Calculator.test.jsx (create) — Jest tests for Calculator component (renders, input flow, result display, error display, reset)

**Dependencies:**  
Item 1, Item 2

**Validation:**  
- `npm run test` passes all Calculator component tests.
- UI is fully functional: input, operation selection, calculation, error display, reset.

**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment

**Goal:**  
Provide all infrastructure, deployment, and documentation files for local development and Netlify deployment. Includes environment variable template, gitignore, Netlify config, Vite config, package.json, Docker Compose (for completeness), run script, and documentation.

**Files to create:**
- .gitignore (create) — Exclude node_modules, build artifacts, .env, etc.
- .env.example (create) — Template for environment variables (VITE_APP_TITLE, VITE_APP_ENV, VITE_NETLIFY_SITEID)
- README.md (create) — Project overview, setup, usage, deployment, contribution, aritmética de enteros explanation
- docker-compose.yml (create) — Placeholder for infrastructure completeness (no backend, but included per SPEC.md)
- run.sh (create) — Startup script for local development (`npm run dev`)
- netlify.toml (create) — Netlify deployment configuration (build command, publish directory)
- package.json (create) — NPM dependencies, scripts (dev, build, test, lint)
- vite.config.js (create) — Vite build and dev server configuration
- public/index.html (create) — HTML entry point, includes <script src="/src/main.jsx">

**Tests required:**  
N/A (infrastructure only; tests are in previous items)

**Dependencies:**  
Items 1, 2, 3

**Validation:**  
- `./run.sh` starts the dev server and prints the local URL.
- `npm run build` produces a production build.
- Netlify deploys successfully from the repo.
- All environment variables are documented and used.
- README.md includes all required sections.

**Role:** role-devops (devops_support)

---

**END OF PLAN**