"use strict";

require('dotenv').config({ path: './.env' });
module.exports = {
    NODE_ENV: '"production"',
    SERVER_URL: '"https://api.maryoku.com"',
    HOST_URL: '"app.maryoku.com"',
    S3_BUCKET_NAME: '"maryoku"',
    S3_URL: '"https://s3.amazonaws.com/static.maryoku.com/"',
    RESOURCE_URL: '"https://static-maryoku.s3.amazonaws.com/"',

    // load from .env
    AWS_REGION: `"${process.env.AWS_REGION}"`,
    AWS_ACCESSKEY: `"${process.env.AWS_ACCESSKEY}"`,
    AWS_SECRETKEY: `"${process.env.AWS_SECRETKEY}"`,
    GOOGLE_API_KEY: `"${process.env.GOOGLE_API_KEY}"`,
    MSAL_CLIENT_ID: `"${process.env.MSAL_CLIENT_ID}"`,
    STRIPE_PK: `"${process.env.STRIPE_PK}"`
};
