var mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserSchema = new Schema({
'firstname': String,
'lastname': String,
'cargo': String,
'city': String,
'state': String,
'fixo': String,
'celular': String,
'email': String,
'password': String,
'filial': String,
'icon': Array
})

module.exports = mongoose.model('User', UserSchema)
