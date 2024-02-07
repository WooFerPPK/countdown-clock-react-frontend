const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 8080,
        historyApiFallback: true,
        hot: true,
        publicPath: '/',
        proxy: {
            '/api': {
                target: ' ',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
                secure: false,
                headers: {
                    Connection: 'keep-alive'
                },
            },
        },
    },
});
