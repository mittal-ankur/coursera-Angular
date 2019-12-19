(function () {
  'use strict'

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;
    narrowCtrl.found = MenuSearchService.getItems();
    narrowCtrl.searchMenuItems = function () {
      if (narrowCtrl.searchTerm === "") {
        MenuSearchService.clear();
      } else {
        MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
        .then(function(result) {
          narrowCtrl.found = result;
        });
      }
    }

    narrowCtrl.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundCtrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundCtrl = this;
    foundCtrl.isNothingFound = function() {
      return (foundCtrl.items.length === 0 ? true:false);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function(searchTerm) {
      foundItems.splice(0, foundItems.length);
      if (searchTerm === "") {
        return foundItems;
      }
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result) {
        var allItems = result.data.menu_items;
        allItems.filter( function (item) {
            if(item.description.toLowerCase().includes(searchTerm.toLowerCase())){
              foundItems.push(item);
            }
        });
        return foundItems;
      });
    };

    service.getItems = function() {
      return foundItems;
    };

    service.clear = function() {
      foundItems.splice(0, foundItems.length);
    }

    service.removeItem = function(itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }
})();
