module.exports = {
  appId: '',
  compileType: 'miniprogram',
  pages: {
    index: 'src/index',
    'vtabs-content/index': 'src/vtabs-content/index',
  },
  outputDir: 'miniprogram_dist',
  plugins: [
    '@mpflow/plugin-babel',
    '@mpflow/plugin-typescript',
    '@mpflow/plugin-css',
  ],
}
