var myNinjaApp = angular.module('fkWhites',['ngRoute']);

myNinjaApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/home',{
    templateUrl:'views/home.html',
    controller:'NinjaController'
  })
  .when('/directory', {
    templateUrl:'views/directory.html',
    controller:'NinjaController'
  })
  .otherwise({
    redirectTo: '/home'
  });
}]);
// Directive
myNinjaApp.directive('randomNinja',[function(){
  return {
    restrict:'E',
    scope:{
      ninjas:'=', // binding
      title:'='
    },
    templateUrl: 'views/random.html',
    controller:function($scope){
      $scope.random = Math.floor(Math.random()*4);
    }
  };
}]);
// Controller
myNinjaApp.controller('NinjaController',['$scope', '$http',function($scope, $http){
  $scope.removeNinja = function(ninja){
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
  };

  $scope.addNinja = function(){
    $scope.ninjas.push({
      name: $scope.newNinja.name,
      belt:$scope.newNinja.belt,
      rate:parseInt($scope.newNinja.rate),
      available:true
    });
    $scope.newNinja.name = "";
    $scope.newNinja.belt = "";
    $scope.newNinja.rate = "";
  };

  // Get Data from JSON
  $http.get('data/ninjas.json').success(function(data){
    $scope.ninjas = data;
  });
  // console.log(angular.toJson($scope.ninjas));
  // $scope.message = "hey lorem";
  // $scope.ninjas = ['alpha','beta','charli','delta'];
}]);
// myNinjaApp.config(function({
//
// }));
// myNinjaApp.run(function(){
//
// });
