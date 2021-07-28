"use strict";

var webpack = require("webpack");

module.exports = {
    NODE_ENV: '"production"',
    SERVER_URL: '"https://api.maryoku.com"',
    GOOGLE_API_KEY: '"AIzaSyCuHr_Quojoaxqw9dWHgbPHItxfsZAYKsY"',
    HOST_URL: '"app.maryoku.com"',
    plugins: [
        // ...
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
    ],
    S3_BUCKET_NAME: '"maryoku"',
    AWS_REGION: '"us-east-1"',
    AWS_ACCESSKEY: '"AKIAT5QXLXDJGWDFXJQL"',
    AWS_SECRETKEY: '"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"',
    S3_URL: '"https://maryoku.s3.amazonaws.com/"',
    // RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"'
    // RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"'
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',
    MSAL_CLIENT_ID: '"f223fa12-662c-4b0c-b866-9eef6549e763"'
};
