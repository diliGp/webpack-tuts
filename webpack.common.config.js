const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');



const rules = [
    {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [{
            loader: 'file-loader',
            options: {
                name: './static/images/[name].[ext]',
                publicPath: '/static/images/'
            }
        }]
    },
    {
        test: /\.(ttf|woff|woff2)$/i,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: '/static/fonts/',
                publicPath: '/static/fonts/'
            }
        }]
    },
    {
        test: /\.(sa|sc|c)ss$/i,
        use: [
            {
                /**
                 * Extracts css into separate file.
                 */
                loader: MiniCssExtractPlugin.loader,
                options: {
                    reloadAll: true,
                    publicPath: '/static/css/',
                }
            },
            {
                /**
                 * Webpack imports the css files and convert them into js implementation.
                 */
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },

            /**
             * Webpack loads scss files and converts them into css files. 
             */
            'sass-loader'
        ]
    },
    {
        test: /\.(js|jsx)$/,
        use: {
            loader: 'babel-loader',
            options: {
                /**
                 * Supports all the latest features like es6|7|8...
                 */
                presets: ['@babel/env', '@babel/preset-react'],
                /**
                 * Class properties transformer which let's us write class properties 
                 * with ease and make them supported by the browsers. 
                 */
                plugins: ['transform-class-properties']
            }
        }
    },
    {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
    }
];

const plugins = [
    new MiniCssExtractPlugin({
        filename: './static/css/[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        title: 'Custom React App'
    }),
    new BundleAnalyzerPlugin()
];

module.exports = {
    entry: './src/index.js',
    optimization: {
        splitChunks: {
            /**
             * Allthe common dependencies will be separated into create separate files 
             * if they exceeds 30kb.
             */
            chunks: 'all',

            /**
             * File size, based on which the common dependencies will be separated 
             * into separate file.
             * Changing to 10kb.
             *   
             * Default size 30kb.
             */
            minSize: 10000,

            /**
             * This is separator of chunk name, by default it's `~`
             * @example `vendor_[chunk1]_[chunk2]...` ==> `vendor_route1_route2`
             */
            automaticNameDelimiter: '_'
        }
    },
    module: {
        rules
    },
    plugins
}