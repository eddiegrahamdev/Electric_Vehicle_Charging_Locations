'use strict';

angular.module('myApp.home', [
    'ngRoute',
    'myApp.chargingLocationInfoPane'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($scope, $http, uiGmapGoogleMapApi) {

    init();

    /**
     * Init controller's scope variables, functions and GET charge device data
     */
    function init() {
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
        // Connector types
        $scope.connectorTypes = ['Show All'];
        // Default selected connector type
        $scope.selectedConnectorType = 'Show All';

        // Default map options (Glasgow)
        $scope.map = {
            center: {
                latitude: 55.863357,
                longitude: -4.251583
            },
            zoom: 9,
            events: {
                tilesloaded: function (map) {
                    $scope.mapObj = map;
                }
            }
        };

        // Marker events
        $scope.markerEvents = {
            click: function (marker) {
                $scope.selectedChargeDevice = $scope.chargeDevices[marker.key];
                // Change marker icon on click and 'bring to front' with zIndex
                marker.setIcon('images/red-dot.png');
                marker.setZIndex(9999999999);

                // Reset icon and zIndex on previously set marker (if different marker)
                if ($scope.selectedMarkerObj && ($scope.selectedMarkerObj.key !== marker.key)) {
                    $scope.selectedMarkerObj.setIcon('images/blue-dot.png');
                    $scope.selectedMarkerObj.setZIndex($scope.selectedMarkerObj.key);
                }

                $scope.selectedMarkerObj = marker;
            }
        };

        /**
         * Nullify selected charge device if it does not contain selected connector type.
         * Then filter markers by the selected connector type.
         *
         * 'Show All' is a keyword which will not do any filtering
         */
        $scope.selectedConnectorTypeChange = function() {
            if ($scope.selectedChargeDevice && $scope.selectedConnectorType !== 'Show All') {

                if (!isConnectorTypeContainedInChargeDevice($scope.selectedChargeDevice, $scope.selectedConnectorType)) {
                    $scope.selectedChargeDevice = null;
                }
            }

            filterMarkersByConnectorType($scope.selectedConnectorType);
        };

        /**
         * This function will be overridden when the Google Maps SDK is loaded (see code below)
         */
        $scope.showDirections = function() {
            alert('Google Maps has not fully loaded yet. Please try again in a few seconds.');
        };

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

        if ($scope.chargeDevices && $scope.chargeDevices.length > 0) {
            for (let index = 0; index < $scope.chargeDevices.length; index++) {
                let chargeDevice = $scope.chargeDevices[index];

                // Store connector types
                if (chargeDevice.Connector && chargeDevice.Connector.length > 0) {
                    for (let j = 0; j < chargeDevice.Connector.length; j++) {
                        let connectorType = chargeDevice.Connector[j].ConnectorType;

                        // Only add connector types which we have not already parsed
                        if (!$scope.connectorTypes.includes(connectorType)) {
                            $scope.connectorTypes.push(connectorType);
                        }
                    }
                }

                // We are only showing charging locations that are free from access restrictions and which
                // do not require a subscription
                if (!chargeDevice.AccessRestrictionFlag && !chargeDevice.SubscriptionRequiredFlag) {
                    $scope.markers.push(createMarkerObject(chargeDevice, index));
                }
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
                icon: 'images/blue-dot.png',
                // Set the zIndex as the index value so we know what to revert it to when
                // the user clicks on a new marker
                zIndex: index
            }
        };
    }

    /**
     * Failed to GET data file
     */
    function errorCallback() {
        alert('Error - Failed to retrieve data.');
    }

    /**
     * Filter the markers on the map showing only the ones which contain the selected connector type
     */
    function filterMarkersByConnectorType(connectorType) {
        $scope.markers = [];

        if ($scope.chargeDevices && $scope.chargeDevices.length > 0) {
            for (let index = 0; index < $scope.chargeDevices.length; index++) {
                let chargeDevice = $scope.chargeDevices[index];

                // We are only showing charging locations that are free from access restrictions and which
                // do not require a subscription
                if (!chargeDevice.AccessRestrictionFlag && !chargeDevice.SubscriptionRequiredFlag) {
                    if (isConnectorTypeContainedInChargeDevice(chargeDevice, connectorType) || connectorType === 'Show All') {
                        $scope.markers.push(createMarkerObject(chargeDevice, index));
                    }
                }
            }
        }
    }

    /**
     * Parses the 'Connector' property of the charge device and returns a boolean indicating
     * whether or not the given connector type is present
     * @param chargeDevice
     * @param connectorType
     * @returns boolean
     */
    function isConnectorTypeContainedInChargeDevice(chargeDevice, connectorType) {
        let found = _.filter(chargeDevice.Connector, function(connector){
            return connectorType === connector.ConnectorType;
        });

        return found && found.length > 0;
    }

    // Promise when Google Maps SDK is fully ready
    uiGmapGoogleMapApi.then(function() {
        // Init google map objects for directions
        let directionsRenderer = new google.maps.DirectionsRenderer();
        let directionsService = new google.maps.DirectionsService();

        /**
         * Show directions to the given destination on the map
         * @param destination - <latitude>,<longitude>
         */
        $scope.showDirections = function() {
            // If we do not have the user's geolocation data then abort
            if (!$scope.geolocation) {
                alert('Geolocation permission must be allowed to use this functionality.');
                return;
            }

            let request = {
                origin: $scope.geolocation.coords.latitude + ',' + $scope.geolocation.coords.longitude,
                destination: $scope.selectedChargeDevice.ChargeDeviceLocation.Latitude + ',' + $scope.selectedChargeDevice.ChargeDeviceLocation.Longitude,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                    directionsRenderer.setMap($scope.mapObj);
                }
                else {
                    alert('Error - Failed to retrieve directions.');
                }
            });
        };
    });
});