// Handles http requests (express is node.js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv data from .env file
const dotenv = require('dotenv');
dotenv.config();

const app = express();

module.exports = app