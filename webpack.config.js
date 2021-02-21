const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const ESlintPlugin = require('eslint-webpack-plugin')
//设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'], //将html文件添加之后可以解决开启HMRhtml不能热更新问题
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/built.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //mini-loader，提取css为单独文件
            options: {
              publicPath: '../' //css文件路径
            }
          }, 
          'css-loader',
          {
            loader: 'postcss-loader', //css兼容性loader
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                  ]
                ]
              }
            }
          },
          'sass-loader'
        ] 
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false,
          outputPath: 'images', //输入路径
        },
        type: 'javascript/auto'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', //js兼容性loader
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { //corejs
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '50',
                  ie: '11',
                  safari: '10'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({ //css单独文件插件
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(), //压缩css
    new ESlintPlugin({
      fix: true //自动修复eslint错误
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true, //启动gzip压缩
    port: 3000,
    open: true,
    hot: true //开启HMR "开启后 **js文件默认不支持HMR功能**，*html文件不能热更新了*"(html不需要HMR)
  },
  target: "web", //不自动刷新添加这个
  devtool: 'eval-source-map' // inline-source-map | hidden-source-map | eval-source-map | 等; 推荐使用 eval-source-map 加快速度
}