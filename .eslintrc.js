module.exports = {
  extends: './node_modules/sijiaoh-gts/build/src/next',
  overrides: [
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'node/no-unpublished-import': 'off',
      },
    },
  ],
};
