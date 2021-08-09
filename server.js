const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
 
/*FOR API ROUTES*/
const api = require('./server/routes/api');
 
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
// Angular DIST output folder
//app.use(express.static(path.join(__dirname, 'website/dist')));
//app.use(express.static(__dirname + '/website/dist'));
app.use('', express.static(__dirname + '/website/dist'));
app.use('/admin', express.static(__dirname + '/admin/dist'));
 
// API Location
app.use('/api', api);
 
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/dist/index.html'))
});
 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website/dist/index.html'))
});
 
// Set port
const port = process.env.PORT || 3000;
app.set('port', port);
 
// Server
const server = http.createServer(app);
 
/*FOR SET CONNECTION PORT*/
server.listen(port,  () => console.log(`Running on localhost:${port}`));
     
module.exports = app;