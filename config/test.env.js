'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    SERVER_URL: '"https://api-dev.262days.com"',
    GOOGLE_API_KEY:'"AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8'
})
