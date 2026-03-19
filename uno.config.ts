import type { Theme } from '@unocss/preset-wind4'
import {
  defineConfig,
  presetWind4,
  toEscapedSelector,
  transformerDirectives,
} from 'unocss'

export default defineConfig<Theme>({
  theme: {
    // Color combination: https://coolors.co/3a455b-e7e6d1-f08a4b-9e2b25-646f4b
    colors: {
      primary: {
        DEFAULT: 'oklch(39.5% 0.042 264)', // #3b465d
        '50': 'oklch(97.0% 0.006 264)', // #f3f5f9
        '100': 'oklch(91.5% 0.012 264)', // #dfe3eb
        '200': 'oklch(84.5% 0.022 264)', // #c5ccdb
        '300': 'oklch(76.0% 0.035 264)', // #a6b1c8
        '400': 'oklch(66.0% 0.048 264)', // #8392b0
        '500': 'oklch(56.5% 0.055 264)', // #657697
        '600': 'oklch(47.5% 0.050 264)', // #4e5c79
        '700': 'oklch(39.5% 0.042 264)', // #3b465d
        '800': 'oklch(32.0% 0.035 264)', // #2a3345
        '900': 'oklch(25.0% 0.030 264)', // #1a2230
        '950': 'oklch(16.5% 0.025 264)', // #090e19
      },
      secondary: {
        DEFAULT: 'oklch(91.0% 0.028 105)', // #e4e3ce
        '50': 'oklch(99.0% 0.005 105)', // #fcfcf8
        '100': 'oklch(95.5% 0.012 105)', // #f1f1e8
        '200': 'oklch(91.0% 0.028 105)', // #e4e3ce
        '300': 'oklch(85.0% 0.050 105)', // #d2d0ab
        '400': 'oklch(78.0% 0.072 105)', // #beba85
        '500': 'oklch(70.5% 0.090 105)', // #a8a35f
        '600': 'oklch(62.0% 0.082 105)', // #8d894c
        '700': 'oklch(53.0% 0.065 105)', // #716e40
        '800': 'oklch(43.5% 0.048 105)', // #555333
        '900': 'oklch(34.5% 0.032 105)', // #3c3a27
        '950': 'oklch(23.0% 0.020 105)', // #1e1e13
      },
    },
    font: {
      heading: 'Henrietta, ui-sans-serif, system-ui, sans-serif',
      'heading-condensed':
        'Henrietta Condensed, ui-sans-serif, system-ui, sans-serif',
      serif: 'Fraunces, serif',
    },
  },
  rules: [
    [
      'text-underline',
      {
        'text-decoration-line': 'underline',
        'text-decoration-color': 'currentColor',
        'text-decoration-thickness': 'var(--decoration-width)',
        'text-underline-offset': 'var(--decoration-width)',
      },
    ],
    [
      'hyphenate',
      {
        'overflow-wrap': 'break-word',

        '-webkit-hyphens': 'auto',
        '-webkit-hyphenate-limit-before': '3',
        '-webkit-hyphenate-limit-after': '3',
        '-webkit-hyphenate-limit-chars': '6 3 3',
        '-webkit-hyphenate-limit-lines': '2',
        '-webkit-hyphenate-limit-last': 'always',
        '-webkit-hyphenate-limit-zone': '8%',

        hyphens: 'auto',
        'hyphenate-limit-chars': '6 3 3',
        'hyphenate-limit-lines': '2',
        'hyphenate-limit-last': 'always',
        'hyphenate-limit-zone': '8%',
      },
    ],
    [
      /^handdrawn-mask$/,
      (_, { rawSelector }) => {
        const selector = toEscapedSelector(rawSelector)
        return `
${selector} {
  -webkit-mask: var(--handdrawn-mask-svg);
  mask: var(--handdrawn-mask-svg);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

@supports ((-webkit-mask-box-image-width: 10px) or (mask-border-width: 10px)) {
  ${selector} {
    -webkit-mask-box-image-source: var(--handdrawn-mask-png);
    mask-border-source: var(--handdrawn-mask-png);
    -webkit-mask-box-image-slice: 20 fill;
    mask-border-slice: 20 fill;
    -webkit-mask-box-image-width: 10px;
    mask-border-width: 10px;
    -webkit-mask-box-image-repeat: repeat;
    mask-border-repeat: repeat;
  }
}

@media print {
  ${selector} {
    -webkit-mask-image: none !important;
    mask-image: none !important;
  }
}
`
      },
    ],
  ],
  shortcuts: {
    'title-hero':
      'text-4xl text-primary-600 font-heading-condensed font-medium md:text-6xl',
    gutter: 'px-4 sm:px-6 lg:px-8',
  },
  transformers: [transformerDirectives()],
  presets: [presetWind4()],
})
