# Dachsbau Frontend

Frontend for [this website](https://dachsbau-tautenhain.de).

## Key Features

This is my best practice solution to build a Nuxt 3 based frontend and Kirby.

- 📐 Prettier & ESLint
- 🔢 Pre-configured [VSCode settings](./.vscode/settings.json)
- 🐶 Native Git hooks with [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)

## Prerequisites

Before getting started, please make sure you have installed the recommended setup.

- **Node.js**<sup>\*</sup> (v16, the latest LTS version) 👉 [[Download](https://nodejs.org/en/download/)]
- **pnpm**<sup>\*</sup> (the fast and disk space efficient package manager) 👉 [[Download](https://pnpm.io/installation#nodejs-is-preinstalled)]
- **Visual Studio Code** 👉 [[Download](https://code.visualstudio.com/)]
- **Volar Extension** 👉 [[Download](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)]
  - Enable [**Take Over Mode**](https://vuejs.org/guide/typescript/overview.html#takeover-mode)

## Setup

Make sure to install the dependencies

```bash
pnpm install
```

## Development

Start the development server on http://localhost:3000

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Check out the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).
