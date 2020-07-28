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
    ]
}
