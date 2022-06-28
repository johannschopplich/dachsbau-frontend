import { defineConfig } from 'unocss'
import { presetTypography } from '@unocss/preset-typography'
import { presetWind, theme as themeWind } from '@unocss/preset-wind'
import transformerDirective from '@unocss/transformer-directives'

const theme = {
  // Color combination: https://coolors.co/3a455b-e7e6d1-f08a4b-9e2b25-646f4b
  colors: {
    primary: {
      DEFAULT: '#3A455B',
      '50': '#C4CCDA',
      '100': '#B8C1D2',
      '200': '#9FABC2',
      '300': '#8695B2',
      '400': '#6D7FA2',
      '500': '#5A6B8D',
      '600': '#4A5874',
      '700': '#3A455B', // Original input color
      '800': '#242B39',
      '900': '#0E1116',
    },
    secondary: {
      DEFAULT: '#E7E6D1',
      '50': '#FCFCF9',
      '100': '#F5F5EC',
      '200': '#E7E6D1', // Original input color
      '300': '#D4D2AC',
      '400': '#C1BE87',
      '500': '#ADAA62',
      '600': '#8E8B4A',
      '700': '#696737',
      '800': '#444223',
      '900': '#1F1E10',
    },
  },
  fontFamily: {
    heading: `Henrietta,${themeWind.fontFamily.sans}`,
    'heading-condensed': `Henrietta Condensed,${themeWind.fontFamily.sans}`,
    serif: 'Fraunces,serif',
  },
}

export default defineConfig({
  theme,
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
  ],
  shortcuts: {
    'page-title':
      'text-5xl text-primary-600 font-heading-condensed font-medium md:text-6xl',
    'padding-content': 'px-4 sm:px-6 lg:px-8',
    'breakout-content': 'w-screen ml-[calc(50%-50vw)]',
  },
  transformers: [transformerDirective()],
  presets: [
    presetWind(),
    presetTypography({
      cssExtend: {
        'h1,h2,h3,h4,h5,h6': {
          color: theme.colors.secondary[600],
          'font-family': `Henrietta,${themeWind.fontFamily.sans}`,
          'font-weight': '400',
        },
        a: {
          color: 'currentColor',
          'font-weight': 'unset',
          'text-decoration-line': 'underline',
          'text-decoration-color': theme.colors.primary[600],
          'text-decoration-thickness': 'var(--decoration-width)',
          'text-underline-offset': 'var(--decoration-width)',
        },
        'a:hover': {
          color: theme.colors.primary[500],
          'text-decoration-line': 'underline',
        },
        'a code': {
          color: theme.colors.primary[500],
          'text-decoration-line': 'none',
        },
        'p,ul,ol,pre': {
          margin: '1em 0',
          'line-height': 1.5,
        },
        'figure,picture': {
          margin: '2em auto',
        },
        figcaption: {
          color: theme.colors.primary[700],
          padding: '0.25em 0.5em',
        },
      },
    }),
  ],
})
