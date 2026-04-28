# SPEC.md

## 1. TECHNOLOGY STACK

- **Frontend Framework:** React 18.2.0
- **Language:** JavaScript ES6+
- **Build Tool:** Vite 4.4.9
- **Styling:** CSS3
- **Markup:** HTML5
- **Testing:** Jest 29.7.0
- **Deployment:** Netlify

## 2. DATA CONTRACTS

### Data Models

#### OperationInput

- `firstNumber`: number (integer, required)
- `secondNumber`: number (integer, required)
- `operation`: string (`'add'` or `'subtract'`, required)

#### OperationResult

- `result`: number (integer, required)
- `error`: string | null (nullable, error message if any)

### TypeScript Interface Definitions

```typescript
// src/types/OperationInput.ts
export interface OperationInput {
  firstNumber: number;
  secondNumber: number;
  operation: 'add' | 'subtract';
}

// src/types/OperationResult.ts
export interface OperationResult {
  result: number;
  error: string | null;
}
```

### JavaScript JSDoc Typedefs

```javascript
/**
 * @typedef {Object} OperationInput
 * @property {number} firstNumber
 * @property {number} secondNumber
 * @property {'add'|'subtract'} operation
 */

/**
 * @typedef {Object} OperationResult
 * @property {number} result
 * @property {string|null} error
 */
```

## 3. API ENDPOINTS

**Note:** This is a frontend-only SPA. All business logic is implemented client-side. There are no HTTP API endpoints.

- All calculations and validations are performed in the browser.
- No backend endpoints exist.

## 4. FILE STRUCTURE

```
calculadora-v14/
├── .gitignore                  # Git ignore rules
├── .env.example                # Template for environment variables
├── README.md                   # Project documentation
├── docker-compose.yml          # (Not used, but included for infrastructure completeness)
├── run.sh                      # Startup script for local development
├── netlify.toml                # Netlify deployment configuration
├── package.json                # NPM dependencies and scripts
├── vite.config.js              # Vite build configuration
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Root React component
│   ├── components/
│   │   ├── Calculator.jsx      # Calculator UI and logic
│   │   ├── ResultDisplay.jsx   # Displays calculation result
│   │   └── OperationForm.jsx   # Form for user input
│   ├── hooks/
│   │   └── useCalculator.js    # Custom React hook for calculator state/logic
│   ├── types/
│   │   ├── OperationInput.js   # JSDoc typedef for OperationInput
│   │   └── OperationResult.js  # JSDoc typedef for OperationResult
│   ├── styles/
│   │   └── calculator.css      # Calculator-specific CSS
│   └── __tests__/
│       ├── Calculator.test.jsx # Jest tests for Calculator component
│       └── useCalculator.test.js # Jest tests for useCalculator hook
└──
```

### File Descriptions

- `.gitignore`: Excludes node_modules, build artifacts, and environment files from git.
- `.env.example`: Template for environment variables (see §5).
- `README.md`: Project overview, setup, and usage instructions.
- `docker-compose.yml`: Placeholder for container orchestration (not used in this SPA, but included for completeness).
- `run.sh`: Script to start the development server (`npm run dev`).
- `netlify.toml`: Netlify deployment configuration (build command, publish directory).
- `package.json`: Project dependencies, scripts, and metadata.
- `vite.config.js`: Vite build and dev server configuration.
- `public/index.html`: HTML entry point, includes `<script src="/src/main.jsx">`.
- `src/main.jsx`: React entry point, renders `<App />`.
- `src/App.jsx`: Root component, renders `<Calculator />`.
- `src/components/Calculator.jsx`: Main calculator UI, manages state and renders form/result.
- `src/components/ResultDisplay.jsx`: Displays the calculation result or error.
- `src/components/OperationForm.jsx`: Form for entering numbers and selecting operation.
- `src/hooks/useCalculator.js`: Custom React hook for calculator logic and state.
- `src/types/OperationInput.js`: JSDoc typedef for OperationInput.
- `src/types/OperationResult.js`: JSDoc typedef for OperationResult.
- `src/styles/calculator.css`: CSS for calculator layout and appearance.
- `src/__tests__/Calculator.test.jsx`: Jest tests for Calculator component.
- `src/__tests__/useCalculator.test.js`: Jest tests for useCalculator hook.

## 5. ENVIRONMENT VARIABLES

| Name                | Type   | Description                                   | Example Value      |
|---------------------|--------|-----------------------------------------------|-------------------|
| VITE_APP_TITLE      | string | Application title shown in browser tab        | Calculadora v14   |
| VITE_APP_ENV        | string | Environment identifier                        | development       |
| VITE_NETLIFY_SITEID | string | Netlify site ID for deployment (optional)     | abc123def456      |

**.env.example:**
```
VITE_APP_TITLE=Calculadora v14
VITE_APP_ENV=development
VITE_NETLIFY_SITEID=
```

## 6. IMPORT CONTRACTS

### Foundation File Exports

- `src/hooks/useCalculator.js`
  - `useCalculator` (default export): Custom React hook

  ```javascript
  import useCalculator from '../hooks/useCalculator';
  ```

- `src/components/Calculator.jsx`
  - `Calculator` (default export): Main calculator component

  ```javascript
  import Calculator from './components/Calculator';
  ```

- `src/components/ResultDisplay.jsx`
  - `ResultDisplay` (default export): Displays result/error

  ```javascript
  import ResultDisplay from './components/ResultDisplay';
  ```

- `src/components/OperationForm.jsx`
  - `OperationForm` (default export): Form for user input

  ```javascript
  import OperationForm from './components/OperationForm';
  ```

- `src/types/OperationInput.js`
  - JSDoc typedef only; no runtime export

- `src/types/OperationResult.js`
  - JSDoc typedef only; no runtime export

- `src/styles/calculator.css`
  - CSS import in `Calculator.jsx`:

  ```javascript
  import '../styles/calculator.css';
  ```

- `src/main.jsx`
  - Renders `<App />` into `#root`

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  ```

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitive

#### React Hook: `useCalculator()`

Returns:
```javascript
{
  firstNumber,         // number
  secondNumber,        // number
  operation,           // 'add' | 'subtract'
  result,              // number | null
  error,               // string | null
  loading,             // boolean
  setFirstNumber,      // (n: number) => void
  setSecondNumber,     // (n: number) => void
  setOperation,        // (op: 'add'|'subtract') => void
  calculate,           // () => void
  reset,               // () => void
}
```

- `firstNumber`: Current value of the first input field.
- `secondNumber`: Current value of the second input field.
- `operation`: Current operation ('add' or 'subtract').
- `result`: Result of the last calculation, or null if not calculated.
- `error`: Error message if validation fails, else null.
- `loading`: Boolean indicating if calculation is in progress.
- `setFirstNumber`: Setter for first number.
- `setSecondNumber`: Setter for second number.
- `setOperation`: Setter for operation.
- `calculate`: Triggers calculation and validation.
- `reset`: Clears all state to initial values.

### Reusable Components

#### Calculator

Props: none (uses `useCalculator` internally)

#### OperationForm

Props:
```javascript
{
  firstNumber: number,
  secondNumber: number,
  operation: 'add' | 'subtract',
  setFirstNumber: (n: number) => void,
  setSecondNumber: (n: number) => void,
  setOperation: (op: 'add'|'subtract') => void,
  onSubmit: () => void,
  loading: boolean,
}
```

#### ResultDisplay

Props:
```javascript
{
  result: number | null,
  error: string | null,
  onReset: () => void,
}
```

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.jsx` for all React components and entry points.
- **Project language:** JavaScript (no TypeScript; all files use `.js` or `.jsx`).
- **Entry point:** `/src/main.jsx` (as referenced in `<script src="/src/main.jsx">` in `public/index.html`).

**Summary:**
- All React components: `.jsx`
- All hooks and utility files: `.js`
- No `.ts` or `.tsx` files
- All type definitions via JSDoc in `.js` files
- Entry point: `/src/main.jsx`