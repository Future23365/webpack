const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bunder.js',
    path: resolve(__dirname, 'build'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]', //哈希前10位，[ext]:源文件后缀名
        }
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',  //处理img标签，负责引入图片
      },
      {
        // exclude: /\.(css|js|html)$/, //排除资源
        test: /\.(eot|ttf|svg|woff|woff2)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  // target: "web",
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // contentBase: './dist',
    compress: true, //启动gzip压缩
    port: 3000,
    open: true
  }
}