/** 
 * @name server.js
 * @desc Resource Serving Server for Heroku
 */

const express = require('express');
const app = express();
const fallback = require('express-history-api-fallback');
const path = require('path');
const distDir = path.join(__dirname, 'dist');

app.use(express.static(distDir));
app.use(fallback('index.html', { root: distDir }));

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Serving server is listening on port ${port}`));
