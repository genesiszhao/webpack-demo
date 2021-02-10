const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// 尝试使用环境变量，否则使用根路径
const TestWebpackPlugin = require('./config/plugins/TestWebpackPlugin')

const ASSET_PATH = process.env.ASSET_PATH || ''

module.exports = {
  mode: 'development',
  entry: {
    // main: ['react-hot-loader/patch', './src/main.js'],
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: ASSET_PATH,
  },
  // 内敛相对于外联不会生成文件, 内联构建速度快
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // new webpack.DefinePlugin({
    // 	'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    // }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash].css',
    // }),
    new CssMinimizerPlugin(),
    // new ESLintWebpackPlugin({
    //   fix: true,
    // }),
    // new BundleAnalyzerPlugin(),
    // new HardSourceWebpackPlugin(),
    new TestWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.tsx$/,
        use: [
          'ts-loader',
          {
            loader: 'logLoader',
            options: {
              // 通过 loader-utils 获取options
              name: 'name',
              // age: 18,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        // loader: 'babelLoader',
        // options: {
        //   presets: ['@babel/preset-env'],
        // },
        use: [
          // 'cache-loader',
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     cacheDirectory: true,
          //   },
          // },
          {
            loader: 'babelLoader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
        // exclude: /node_modules/,
        // include: path.resolve(__dirname, 'src'),
      },
      // {
      // 	test: /\.(ts|tsx)?$/,
      // 	loader: 'ts-loader',
      // 	include: path.resolve(__dirname, 'src'),
      // 	exclude: /node_modules/,
      // 	options: {
      // 		transpileOnly: true,
      // 	},
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src/assets'),
        // type: "asset/resource",
        type: 'javascript/auto',
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[contenthash].[ext]',
          //   outputPath: 'resource',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, 'src/assets'),
        // type: "asset/resource",
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[contenthash].[ext]',
          //   outputPath: 'resource',
        },
      },
      // const loaderUtils = require('loader-utils')

      // module.exports = function (sourceCode) {
      //   console.log('my loader work')
      //   const optionsName = loaderUtils.getOptions(this).name || ''
      //   return sourceCode.replace(/div/g, optionsName)
      // }
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: './myloader.js',
      //       options: {
      //         name: 'span',
      //       },
      //     },
      //     'html-loader',
      //   ],
      // },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'config/loaders')],
  },
  // resolve: {
  //   extensions: ['.js', '.jsx'],
  // },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      chunks: 'all',
      // minimize: false,
      // minimizer: [
      //   // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      //   // `...`
      //   new CssMinimizerPlugin(),
      // ],
    },
  },
}
