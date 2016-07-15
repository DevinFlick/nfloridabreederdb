var uuid = require('uuid');
function Breeder(breedingCategory, sellsTo, shipsStock, cityState, stockInBreeding, sellableStock, contactBreeder, id){
  this.id = id || uuid.v4();
  this.breedingCategory = breedingCategory;
  this.sellsTo = sellsTo;
  this.shipsStock = shipsStock;
  this.cityState = cityState;
  this.stockInBreeding = stockInBreeding;
  this.sellableStock = sellableStock;
  this.contactBreeder = contactBreeder;
}

Breeder.prototype.updateComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.shipsStock = true;
  } else {
    this.shipsStock = false;
  }
};

Breeder.prototype.postComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.shipsStock = true;
  } else {
    this.shipsStock = false;
  }
};

module.exports = Breeder;
