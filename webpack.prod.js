const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Countdown CLock',
            template: './public/index.html'
        })
    ]
});
