'use strict';

angular.module('myApp.view1', [
    'ngRoute',
    'myApp.chargingLocationInfoPane'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {

    init();

    function init() {
        // Default map options
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };
        // Full data object
        $scope.chargeDevices = null;
        // All markers
        $scope.markers = null;
        // User selected charge device data
        $scope.selectedChargeDevice = null;
        // User selected marker obj
        $scope.selectedMarkerObj = null;

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

        // Need a scope apply here as this function is called outside of angular 'environment'
        $scope.$apply();
    }

    function geolocationPermissionDenied() {
        // TODO
    }

    function successCallback(response) {
        $scope.chargeDevices = response.data.ChargeDevice;
        $scope.markers = [];

        for (let index = 0; index < $scope.chargeDevices.length; index++) {
            let chargeDevice = $scope.chargeDevices[index];

            // We are only showing charging locations that are free from access restrictions and which
            // do not require a subscription
            if (!chargeDevice.AccessRestrictionFlag && !chargeDevice.SubscriptionRequiredFlag) {
                $scope.markers.push(createMarkerObject(chargeDevice, index));
            }
        }
    }

    function createMarkerObject(chargeDevice, index) {
        return {
            // Set the id as the array index for easy retrieval of the device data when marker is clicked
            id: index,
            coords: {
                latitude: chargeDevice.ChargeDeviceLocation.Latitude,
                longitude: chargeDevice.ChargeDeviceLocation.Longitude
            },
            options: {
                title: chargeDevice.ChargeDeviceName,
                icon: 'images/red-dot.png'
            },
            events: {
                click: function (marker) {
                    $scope.selectedChargeDevice = $scope.chargeDevices[marker.key];
                    marker.setIcon('images/green-dot.png');

                    // Reset icon on previously set marker
                    if ($scope.selectedMarkerObj) {
                        $scope.selectedMarkerObj.setIcon('images/red-dot.png');
                    }

                    $scope.selectedMarkerObj = marker;
                }
            }
        };
    }

    function errorCallback(response) {
        // TODO failed to GET data file
    }

    // uiGmapGoogleMapApi.then(function(maps) {
    //     console.log();
    // });
});