const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || ''

module.exports = {
	mode: 'development',
	entry: {
		main: './src/main.js',
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: ASSET_PATH,
	},

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
		}),
		// new webpack.DefinePlugin({
		// 	'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
		// }),
		new MiniCssExtractPlugin(),
		new CssMinimizerPlugin(),
		new ESLintWebpackPlugin({
			fix: true,
			// failOnError: true,
			// failOnWarning: true,
		}),
		// new MiniCssExtractPlugin({ filename: "style.[chunkhash].css" }),
	],

	module: {
		rules: [
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					// "style-loader",
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.js$/i,
				loader: 'babel-loader',
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
					name: '[hash].[ext]',
					outputPath: 'resource',
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
					name: '[hash].[ext]',
					outputPath: 'resource',
				},
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'initial',
		},
		minimize: false,
		minimizer: [
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			// `...`
			// new CssMinimizerPlugin(),
		],
	},
}
