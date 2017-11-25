'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, uiGmapGoogleMapApi) {

    init();

    function init() {
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        centerMapOnGeolocation();

        $http.get('data/nationalChargePointRegistry.json').then(successCallback, errorCallback);
    }

    function centerMapOnGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(centerMap, geolocationPermissionDenied);
        } else {
            // TODO geolocation is not supported by this browser
        }
    }

    function centerMap(position) {
        $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        $scope.$apply();
    }

    function geolocationPermissionDenied() {
        // TODO
    }

    function successCallback(response) {
        $scope.markers = [];

        for (let i = 0; i < response.data.ChargeDevice.length; i++) {
            let chargeDevice = response.data.ChargeDevice[i];

            // We are only showing charging locations that are free from access restrictions and which
            // do not require a subscription
            if (!chargeDevice.AccessRestrictionFlag && !chargeDevice.SubscriptionRequiredFlag) {
                $scope.markers.push(createMarkerObject(chargeDevice));
            }
        }
    }

    function createMarkerObject(chargeDevice) {
        return {
            id: chargeDevice.ChargeDeviceId,
            coords: {
                latitude: chargeDevice.ChargeDeviceLocation.Latitude,
                longitude: chargeDevice.ChargeDeviceLocation.Longitude
            },
            options: {
                title: chargeDevice.ChargeDeviceName
            }
        };
    }

    function errorCallback(response) {
        // TODO failed to GET data file
    }

    uiGmapGoogleMapApi.then(function(maps) {
        console.log();
    });
});