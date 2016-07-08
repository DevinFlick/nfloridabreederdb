var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');
var server = express();

var Breeder = require('./models/breeder.js');
var port = process.env.PORT || 8080
var db = lowdb("db.json");

db.defaults({breeders:[]})
.value();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.post('/breeders/', function(request, response){
  var breeder = new Breeder(request.body.breedingCategory, request.body.sellsTo, request.params.shipsStock, request.body.cityState, request.body.stockInBreeding, request.body.sellableStock, request.body.contactBreeder);
  var result = db.get('breeders')
                  .push(breeder)
                  .last()
                  .value();
  response.send(result);
});

server.get('/breeders/', function(request, response){
  var breeders = db.get('breeders')
  .value();
  response.send(breeders);
});

server.get('/breeders/:id', function(request, response){
  var breeder = db.get('breeders')
                  .find({id:request.params.id})
                  .value();
  response.send(breeder);
});

server.put('/breeders/:id', function(request, response){
  var breeder = new Breeder (request.body.breedingCategory, request.body.sellsTo, request.body.shipsStock, request.body.cityState, request.body.stockInBreeding, request.body.sellableStock, request.body.contactBreeder, request.params.id);
  breeder.updateComplete(request.body.shipsStock);
  var updatedBreeder = db.get('breeders')
                          .find({id: request.params.id})
                          .assign(breeder)
                          .value();
  response.send(updatedBreeder);
  // var updatedBreederInfo = {
  //   breedingCategory:request.body.breedingCategory,
  //   sellsTo:request.body.sellsTo,
  //   shipsStock:false,
  //   cityState:request.body.cityState,
  //   stockInBreeding:request.body.stockInBreeding,
  //   sellableStock:request.body.stockInBreeding,
  //   contactBreeder:request.body.contactBreeder,
  //   plantsAvailable:false
  // };
  // var updatedBreeder = db.get('breeders')
  //                         .find({id: request.params.id})
  //                         .assign(updatedBreederInfo)
  //                         .value();
  // response.send(updatedBreeder);
});

server.delete('/breeders/:id', function(request, response){
  var breeder = db.get('breeders')
                  .remove({id:request.params.id})
                  .value();
  response.send(breeder);
});

server.listen(port, function(){
  console.log('now listening my man')
});
