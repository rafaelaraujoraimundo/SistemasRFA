var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var cors = require("cors")
var app = express()
var api = require('./routes/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/auth_teste',{useNewUrlParser: true})
var auth = require('./routes/auth')
// Adicionar as rotas

app.use('/api',api)
app.use('/auth',auth)
//
app.use(function(req,res,next) {
    res.status(404).send('Not found')
})

app.listen(3000)
