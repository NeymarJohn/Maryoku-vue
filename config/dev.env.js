'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
var webpack = require('webpack')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    //SERVER_URL: '"https://api-dev.maryoku.com"',
    HOST_URL: '"dev.maryoku.com"',
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
    S3_BUCKET_NAME: '"maryoku"',
    AWS_REGION: '"us-east-1"',
    AWS_ACCESSKEY: '"AKIAT5QXLXDJKEP27SUQ"',
    AWS_SECRETKEY: '"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"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',
})