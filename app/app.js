'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'uiGmapgoogle-maps'
]).config(['$locationProvider', '$routeProvider', 'uiGmapGoogleMapApiProvider', function ($locationProvider, $routeProvider, uiGmapGoogleMapApiProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDg38fk0H_7-OPuddIOnViHHZVf6KI07lU',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
}]);
