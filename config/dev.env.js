"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // SERVER_URL: '"https://api-dev.maryoku.com"',
    SERVER_URL: '"http://localhost:8080"',
    // HOST_URL: '"local.maryoku.com"',
    GOOGLE_API_KEY: '"AIzaSyC4qrUfpIKpm5yZ1p7wGJAxa77PJwlgKD8"',
    S3_BUCKET_NAME: '"maryoku"',
    AWS_REGION: '"us-east-1"',
    AWS_ACCESSKEY: '"AKIAT5QXLXDJDLKXRNU7"',
    AWS_SECRETKEY: '"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"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    // RESOURCE_URL: '"http://static.maryoku.com/"'
    // RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"'
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',
    MSAL_CLIENT_ID: '"f223fa12-662c-4b0c-b866-9eef6549e763"',
    STRIPE_PK: '"pk_test_51In2qMBvFPeKz0zXs5ShSv1qjb6YAnonaqamWN4e9f4cTygxBMkMbYXcUAGp7deorwFS5ohy4vuQZFfeIVgxPPMF00nSOnDeQy"'
});
