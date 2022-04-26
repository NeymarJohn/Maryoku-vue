"use strict";
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const webpack = require("webpack")
require('dotenv').config({ path: './.env' });

module.exports = merge(devEnv, {
    NODE_ENV: '"production"',
    // SERVER_URL: '"https://api.maryoku.com"',
    SERVER_URL: '"http://localhost:8080"',
    HOST_URL: '"app.maryoku.com"',
    GOOGLE_API_KEY: '"AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8"',

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
})
