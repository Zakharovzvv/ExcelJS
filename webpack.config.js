const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		polyfill: 'babel-polyfill',
		app: './js/app.js',
	},
	context: path.resolve(__dirname, 'src'),
	devServer: {
		publicPath: '/',
		port: 5000,
		contentBase: path.join(process.cwd(), 'dist'),
		host: 'localhost',
		historyApiFallback: true,
		noInfo: false,
		stats: 'minimal',
		hot: true,
	},
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({
			cssProcessorOptions: {
				safe: true,
				discardComments: {
					removeAll: true,
				},
			},
		})],
	},
	module: {
		rules: [
			{
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
				test: /\.js$/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',

						options: {
							importLoaders: 1,
							sourceMap: true,

						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [precss, autoprefixer],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,

						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: './style.css' }),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
	},
	mode: 'development',
};
