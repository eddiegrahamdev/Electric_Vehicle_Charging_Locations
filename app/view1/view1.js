'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
    $http.get('data/nationalChargePointRegistry.json').then(successCallback, errorCallback);

    function successCallback(response) {
        console.log();
    }

    function errorCallback(response) {
        console.log();
    }
});