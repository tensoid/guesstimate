const express = require('express');
const http = require('http');
var cors = require('cors')
const path = require('path');
const fs = require('fs');
const app = express();

app.use(cors())

const port = process.env.PORT || 3000;

var qoutes = require('./qoutes.json');

app.use(express.static(path.join(__dirname, "/dist/guesstimate")));

app.get('/qoute', (req, res) => {
  res.json(qoutes[Math.floor(Math.random() * qoutes.length)]);
});

app.get('/*', (req, res) => res.redirect('/'));

const server = http.createServer(app);


//qoutes = qoutes.filter(qoute => !(qoute.text.includes("�") || qoute.author.includes("�")));
//fs.writeFileSync('./qoutes.json', JSON.stringify(qoutes));


server.listen(port, () => console.log(`Listening on port ${port}`));