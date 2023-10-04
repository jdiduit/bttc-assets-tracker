module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    'postcss-sort-media-queries': {},
    'postcss-combine-media-query': {},
    'postcss-pxtorem': {
      propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'height', 'width', 'margin', 'margin-right', 'margin-left', 'padding'],
    },
    cssnano: {},
  },
};