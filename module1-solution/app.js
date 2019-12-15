(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.finalMessage = "";
  $scope.foodList = "";

  $scope.checkIfTooMuch = function () {
    var inputData= $scope.foodList.trim();
    if(!inputData){
      $scope.finalMessage = "Please enter data first"
    }
    else {
      if(!inputData.includes(",")){
        $scope.finalMessage = "Enjoy!"
      }
      else {
          var itemsList = inputData.split(',');
          var actualFoodItemCount = 0;
          for(var index=0;index<itemsList.length;index++)
          {
            if(itemsList[index].trim() !== "" ){
              actualFoodItemCount++;
            }
          }
          if(actualFoodItemCount>3){
            $scope.finalMessage = "Too much!";
          }
          else if (actualFoodItemCount>0){
            $scope.finalMessage = "Enjoy!";
          }
          else {
            $scope.finalMessage = "Please enter data first";
          }
        }
    }

  };
}

})();
