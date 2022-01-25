"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

console.log("AWS_REGION", process.env.AWS_REGION);

console.log("STRIPE_PK", process.env.STRIPE_PK);
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SERVER_URL: '"https://api-dev.maryoku.com"',
    S3_BUCKET_NAME: '"maryoku"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',
});
