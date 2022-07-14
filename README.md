# Dachsbau Frontend

Frontend for [Dachsbau Tautenhain](https://dachsbau.netlify.app). The backend code is [over here](https://johannschopplich.com/github/dachsbau-backend).

This repository uses Nuxt 3 for the frontend and fetches content from a [headless Kirby](https://github.com/johannschopplich/kirby-headless-starter) instance.

This website is created for my best friend to support her in her new endeavours to launch a business of her own. I created [`nuxt-kql`](https://nuxt-kql.jhnn.dev) in the process, since I really wanted to try out Kirby in a headless environment.

All illustrations are drawn by the talented artist [Julia Frank](https://www.instagram.com/mum.mal.mini/).

## Prerequisites

Before getting started, please make sure you have installed the recommended setup.

- **Node.js**<sup>\*</sup> (v16, the latest LTS version) 👉 [[Download](https://nodejs.org/en/download/)]
- **pnpm**<sup>\*</sup> (the fast and disk space efficient package manager) 👉 [[Download](https://pnpm.io/installation)]
- **Visual Studio Code** 👉 [[Download](https://code.visualstudio.com/)]
- **Volar Extension** 👉 [[Download](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)]
  - Enable [**Take Over Mode**](https://vuejs.org/guide/typescript/overview.html#takeover-mode)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

Adapt the relevant environment variables:

```bash
# Base URL of the Kirby backend
KIRBY_BASE_URL=
# Token for bearer authentication
# See https://github.com/johannschopplich/kirby-headless-starter
KIRBY_API_TOKEN=
```

## Development

Start the development server on [localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Check out the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

## Credits

- Illustrations done by the great artist (and my favorite person in the world) [Julia Frank](https://www.instagram.com/extra.wagon/).

## License

[MIT](./LICENSE) License © 2022 [Johann Schopplich](https://github.com/johannschopplich) & [Julia Frank](https://www.instagram.com/mum.mal.mini/)
