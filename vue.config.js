const proxy_url = 'http://127.0.0.1:8082';

module.exports = {
  // options...
  pages: {
    index: {
      entry: 'src/pages/index/main.js', //entry for the public page
      template: 'public/index.html', // source template
      filename: 'index.html', // output as dist/*
    },
    admin: {
      entry: 'src/pages/admin/main.js',
      template: 'public/index.html',
      filename: 'admin.html',
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: proxy_url,
        ws: true,
        changeOrigin: true,
        // pathRewrite: {'^/api' : '/c1ctf/api'}
      }
    },
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({ cacheGroups: {
          commons: {
            chunks: "all",
            minChunks: 2, // 被引用两次的公共部分提取出来
            name: 'chunk-vendors',
            enforce: true,
          },
          // vendor: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name: "chunk-vendors",
          //   chunks: "all"
          // }
        }});
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/c1ctf/'
      : '/'
};
