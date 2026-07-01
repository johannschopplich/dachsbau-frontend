<div align="center">

# Dachsbau Tautenhain

Frontend for [dachsbau-tautenhain.de](https://dachsbau-tautenhain.de) – Nuxt on a headless Kirby.

[Website](https://dachsbau-tautenhain.de) •
[Backend](https://github.com/johannschopplich/dachsbau-backend)

</div>

## Why

Madlen – one of my closest friends – moved into the Dachsbau in Tautenhain to bundle her skills in one place and turn her passion into a profession. She asked Julia Frank and me to design the Dachsbau concept and build her website: Julia drew the illustrations, from the abstracted four-sided farmstead down to the badger lying in the corner of the screen, and I did code and photography.

The site doubled as a prototype for a best-practice headless Kirby + Nuxt integration: the [kirby-headless-starter](https://github.com/johannschopplich/kirby-headless-starter) and [nuxt-kql](https://nuxt-kql.byjohann.dev) (today [Nuxt Kirby](https://nuxt-kirby.byjohann.dev)) grew out of it.

## How It's Built

- [Nuxt 4](https://nuxt.com) – SSR frontend, deployed to [Cloudflare Workers](https://workers.cloudflare.com)
- [UnoCSS](https://unocss.dev) + [VueUse](https://vueuse.org) – styling and composables
- [Nuxt Kirby](https://nuxt-kirby.byjohann.dev) + [kirby-types](https://github.com/johannschopplich/kirby-types) – typed KQL queries against the [headless Kirby backend](https://github.com/johannschopplich/dachsbau-backend)
- [Cacao Kit](https://github.com/johannschopplich/cacao-kit-frontend) as the base – block-first rendering via a catch-all route

## Development

1. Create your `.env` from the example and point it at the backend (`KIRBY_BASE_URL`, `KIRBY_API_TOKEN`):

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

Build with `pnpm run build`. Deployment targets Cloudflare Workers via [`wrangler.toml`](./wrangler.toml).

## License

The code is licensed under [MIT](./LICENSE); words and images are licensed under [CC BY-NC-SA 4.0](./CC-BY-NC-SA-4.0).

© 2022-PRESENT [Johann Schopplich](https://github.com/johannschopplich) & [Julia Frank](https://www.instagram.com/mum.mal.mini/)
