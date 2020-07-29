'use strict'

var webpack = require('webpack')

module.exports = {
    NODE_ENV: '"production"',
    SERVER_URL: '"https://api.maryoku.com"',
    GOOGLE_API_KEY:'"AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8"',
    HOST_URL:'"app.maryoku.com"',
    plugins: [
        // ...
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    S3_BUCKET_NAME: '"static.maryoku.com"',
    AWS_REGION: '"us-east-1"',
    AWS_ACCESSKEY: '"AKIAT5QXLXDJDLKXRNU7"',
    AWS_SECRETKEY: '"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"',
    S3_URL: '"http://static.maryoku.com/"'
}
