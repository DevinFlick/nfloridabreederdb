var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');
var server = express();

var port = process.env.PORT || 8080
var db = lowdb("db.json");

db.defaults({breeders:[]})
.value();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.post('/breeders/', function(request, response){
  var breeder = {
    id: uuid.v4(),
    breedingCategory:request.body.breedingCategory,
    sellsTo:request.body.sellsTo,
    shipsStock:false,
    cityState:request.body.cityState,
    stockInBreeding:request.body.stockInBreeding,
    sellableStock:request.body.stockInBreeding,
    contactBreeder:request.body.contactBreeder,
    plantsAvailable:false
  };
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
