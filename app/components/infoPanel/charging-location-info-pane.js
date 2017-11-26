'use strict';

angular.module('myApp.chargingLocationInfoPane', [])

.directive('chargingLocationInfoPane', function () {
    return {
        templateUrl : 'components/infoPanel/charging-location-info-pane.html',
        restrict : 'E',
        scope: {
            chargingLocationData: '=data',
            showDirectionsCallback: '='
        },
        controller: function($scope) {

            /**
             * Call parent controller function to show directions to selected charge device
             */
            $scope.showDirections = function() {
                let destination = $scope.chargingLocationData.ChargeDeviceLocation.Latitude
                    + ','
                    + $scope.chargingLocationData.ChargeDeviceLocation.Longitude;

                $scope.showDirectionsCallback(destination);
            };
        }
    };
});
