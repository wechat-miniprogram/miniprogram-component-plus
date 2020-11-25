module.exports = {
  appId: '',
  compileType: 'miniprogram',
  pages: mode => (mode === 'production' ? ['src/index'] : undefined),
  outputDir: 'miniprogram_dist',
  plugins: [
    '@mpflow/plugin-babel',
    '@mpflow/plugin-typescript',
    '@mpflow/plugin-css',
  ]
}
