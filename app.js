/**
 * Created by lijiliang on 2017/12/8.
 */
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-requested-Width,Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS,POST')
  next();
})
routes(app);

app.set('port', process.env.port || 3001);
app.listen(app.get('port'),()=>{
  console.log('Express server listening on port: '+ app.get('port'))
})