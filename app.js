var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const models = require("./models");
var indexRouter = require('./routes/index');
var cors = require("cors")

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.get('/done',(req,res)=>{
  
  res.sendFile(__dirname+'/pages/index.html')
})
app.use('/api', indexRouter);

app.use(express.static(__dirname + '/dist/endless-starterkit'))

// app.get('*',(req,res)=> res.sendFile(path.join(__dirname + "/dist/endless-starterkit")))
app.get('*', (req, res) => res.sendFile('index.html', { root: __dirname + '/dist/endless-starterkit' }))

models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', "asd");
})
  .catch(err => {
    console.error('Unable to connect to SQL database:', "asdasd", err);
  });

// models.sync();



module.exports = app;
