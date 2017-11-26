'use strict';

angular.module('myApp.chargingLocationInfoPane', [])

.directive('chargingLocationInfoPane', function () {
    return {
        templateUrl : 'components/infoPanel/charging-location-info-pane.html',
        restrict : 'E',
        scope: {
            chargingLocationData: '=data'
        },
        controller: function($scope) {
            console.log();
        }
    };
});
