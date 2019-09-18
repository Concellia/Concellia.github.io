var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')
var mongodb = require('mongodb')

var database = mongodb.MongoClient.connect('mongodb://localhost:27017')
var app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.resolve(__dirname,'public')))
app.post('/get-data',function(req,res){
    database.then(function(data){
        data.collection('visitors').insertOne(req.body)
    })
    res.send("data received: \n" + JSON.stringify(req.body))
})
 
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0')