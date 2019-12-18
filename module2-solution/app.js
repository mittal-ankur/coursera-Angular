(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
      var toBuy = this;

      toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

      toBuy.buyItem = function (itemIndex) {
          ShoppingListCheckOffService.buyItem(itemIndex);
      };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
      var alreadyBought = this;

      alreadyBought.items = ShoppingListCheckOffService.getItemsBought();
  };

  function ShoppingListCheckOffService(){
    var service = this;

    var itemsToBuy = [
                      { name: "Apple", quantity: 8 },
                      { name: "Mango", quantity: 15 },
                      { name: "Banana", quantity: 24 },
                      { name: "Kiwifruit", quantity: 11 },
                      { name: "Melon", quantity: 4 }
                    ];
    var itemsBought = [];

    service.getItemsToBuy = function () {
            return itemsToBuy;
    };

    service.getItemsBought = function () {
        return itemsBought;
    };

    service.buyItem = function (itemIndex) {
      itemsBought.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex,1);
    };
  };
})();
