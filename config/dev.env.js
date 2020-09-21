"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    // SERVER_URL: '"http://192.168.1.105:8080"',
    HOST_URL: '"local.maryoku.com"',
    GOOGLE_API_KEY: '"AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8"',
    S3_BUCKET_NAME: '"maryoku"',
    AWS_REGION: '"us-east-1"',
    AWS_ACCESSKEY: '"AKIAT5QXLXDJDLKXRNU7"',
    AWS_SECRETKEY: '"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"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    // RESOURCE_URL: '"http://static.maryoku.com/"'
    // RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"'
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',
});
