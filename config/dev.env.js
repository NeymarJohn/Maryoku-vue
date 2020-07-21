'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    // SERVER_URL: '"http://localhost:8080"',
    HOST_URL:'"dev.maryoku.com"',
    GOOGLE_API_KEY: '"AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8"'
})
