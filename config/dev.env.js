"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    // SERVER_URL: '"http://localhost:8080"',
    // HOST_URL: '"local.maryoku.com"',
    GOOGLE_API_KEY: '"AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8"',
    S3_BUCKET_NAME: '"maryoku"',
    AWS_REGION: '"us-east-1"',
    AWS_ACCESSKEY: '"AKIAT5QXLXDJKEP27SUQ"',
    AWS_SECRETKEY: '"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"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    // RESOURCE_URL: '"http://static.maryoku.com/"'
    // RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"'
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',
    MSAL_CLIENT_ID: '"f223fa12-662c-4b0c-b866-9eef6549e763"',
    STRIPE_PK: '"pk_test_51HTal4EuCabDZWghILxtp69k5MG4RChq09khIJjnjtZecEii2ij5cc61td6m3GfGDLMzTA8ogTXxSurcDRTmZRpE00v99lC0TV"'
});
