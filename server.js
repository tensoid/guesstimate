const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/dist/guesstimate")));

app.get('/*', (req, res) => res.redirect('/'));

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));