const defaultStylesConfig = [
  {
    css: {
      output: {
        comments: false
      },
      sourceMap: true
    }
  }
]

module.exports = {
  type: 'react-app',
  webpack: {
    html: {
      template: 'public/index.html'
    },
    extra: {
      devtool: 'cheap-source-map',
      // used for gh-pages
      output: {
        publicPath: ''
      }
    },
    styles: {
      css: defaultStylesConfig,
      sass: defaultStylesConfig
    }
  }
}
