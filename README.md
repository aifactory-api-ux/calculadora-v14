# Calculadora v14

A frontend-only calculator SPA built with React 18, Vite, and CSS3. Supports addition and subtraction with integer arithmetic for precision.

## Features

- Addition and subtraction operations
- Integer arithmetic for precision (up to 10 decimal places)
- Responsive, touch-friendly UI (44x44px minimum buttons)
- Clear error handling and validation
- Jest test coverage

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:3000

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Testing

```bash
npm run test
```

## Integer Arithmetic

This calculator uses integer arithmetic internally to avoid floating-point precision errors. Numbers are scaled by 10,000,000,000 (10^10) for storage and calculation, then scaled back for display.

## Deployment

Deployed automatically to Netlify on push to main branch.

## Environment Variables

- `VITE_APP_TITLE`: Application title (default: Calculadora)
- `VITE_APP_ENV`: Environment name
- `VITE_NETLIFY_SITEID`: Netlify site ID (optional)