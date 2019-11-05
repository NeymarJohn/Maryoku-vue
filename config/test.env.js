'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
var webpack = require('webpack')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    GOOGLE_API_KEY:'"AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8"',

    plugins: [
        // ...
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
})
