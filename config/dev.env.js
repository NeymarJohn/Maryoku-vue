'use strict'

var webpack = require('webpack')
module.exports = {
    NODE_ENV: '"development"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    HOST_URL: '"dev.maryoku.com"',
    S3_BUCKET_NAME: '"maryoku"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    RESOURCE_URL: '"https://maryoku.s3.amazonaws.com/"',

    // load from .env
    AWS_REGION: `"${process.env.AWS_REGION}"`,
    AWS_ACCESSKEY: `"${process.env.AWS_ACCESSKEY}"`,
    AWS_SECRETKEY: `"${process.env.AWS_SECRETKEY}"`,
    GOOGLE_API_KEY: `"${process.env.GOOGLE_API_KEY}"`,
    MSAL_CLIENT_ID: `"${process.env.MSAL_CLIENT_ID}"`,
    STRIPE_PK: `"${process.env.STRIPE_PK}"`
};
