const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./build/env.js', 'w', function(err, fd) {
	const buf = 'export default \'production\'';
	fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
})

module.exports = merge(webpackBaseConfig, {
	output: {
		publicPath: '/dist/',
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].chunk.js'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].[hash].css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'vendors.[hash].js'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '\'production\'',
			}
		}),
		new UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			filename: '../index_prod.html',
			template: './src/template/index.ejs',
			inject: false
		})
	]
});