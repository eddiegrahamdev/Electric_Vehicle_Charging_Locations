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

.controller('View1Ctrl', function($scope, $http, uiGmapGoogleMapApi) {

    init();

    /**
     * Init controller's scope variables and GET charge device data
     */
    function init() {
        // Default map options
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            events: {
                tilesloaded: function (map) {
                    $scope.mapObj = map;
                }
            }
        };
        // Full data object
        $scope.chargeDevices = null;
        // All markers
        $scope.markers = null;
        // User selected charge device data
        $scope.selectedChargeDevice = null;
        // User selected marker obj
        $scope.selectedMarkerObj = null;
        // User's geolocation
        $scope.geolocation = null;
        // Map obj
        $scope.mapObj = null;

        centerMapOnGeolocation();

        $http.get('data/national_charge_point_registry/registry.json').then(successCallback, errorCallback);
    }

    /**
     * Attempt to get user's geolocation so we can center the map on these coordinates
     */
    function centerMapOnGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geolocationPermissionGranted, geolocationPermissionDenied);
        } else {
            alert('Geolocation is not supported by browser. Map will centre at default coordinates.');
        }
    }

    /**
     * Geolocation permission granted
     * @param position
     */
    function geolocationPermissionGranted(position) {
        $scope.geolocation = position;
        centerMap(position);
    }

    /**
     * Center map on given position
     * @param position
     */
    function centerMap(position) {
        $scope.map.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        // Need a scope apply here as this function is called outside of angular 'environment'
        $scope.$apply();
    }

    /**
     * Geolocation permission denied
     */
    function geolocationPermissionDenied() {
        alert('Geolocation permission denied. Map will centre at default coordinates.');
    }

    /**
     * Parse charge device data to create markers on the map
     * @param response
     */
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

    /**
     * Create marker object using the charge device data
     * @param chargeDevice
     * @param index
     * @returns {}
     */
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

    /**
     * Failed to GET data file
     */
    function errorCallback() {
        alert('Error - Failed to retrieve data.');
    }

    // Promise when Google Maps SDK is fully ready
    uiGmapGoogleMapApi.then(function() {
        // Init google map objects for directions
        let directionsDisplay = new google.maps.DirectionsRenderer();
        let directionsService = new google.maps.DirectionsService();

        /**
         * Show directions to the given destination on the map
         * @param destination - <latitude>,<longitude>
         */
        $scope.showDirections = function(destination) {
            let request = {
                origin: $scope.geolocation.coords.latitude + ',' + $scope.geolocation.coords.longitude,
                destination: destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.mapObj);
                }
                else {
                    alert('Error - Failed to retrieve directions.');
                }
            });
        };
    });
});