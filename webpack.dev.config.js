const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');


const plugins = [
    new TerserPlugin()
];

module.exports = merge( commonConfig, {
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        index: 'index.html',
        port: 9090,
        /**
         * All the 404s will fallback to index.html.
         */
        historyApiFallback: true,
        hot: true,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: ''
    },
    plugins,
    mode: 'development'
});