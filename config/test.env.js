'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
var webpack = require('webpack')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    HOST_URL: '"dev.maryoku.com"',
    plugins: [
        // ...
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    S3_BUCKET_NAME: '"maryoku"',
})
