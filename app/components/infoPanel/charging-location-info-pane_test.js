'use strict';

describe('myApp.chargingLocationInfoPane module', function() {
    var compile, rootScope;

    beforeEach(module('myApp.chargingLocationInfoPane'));
    beforeEach(module('templates'));

    beforeEach(inject(function($compile, $rootScope){
        compile = $compile;
        rootScope = $rootScope;
    }));

    describe('charging-location-info-pane directive', function () {
        it('should print the helper text when no data is present', function () {

            rootScope.selectedChargeDevice = null;

            let element = compile('<charging-location-info-pane data="selectedChargeDevice"></charging-location-info-pane>')(rootScope);
            rootScope.$digest();

            expect(element.text().indexOf('Click on a marker on the map to show details') !== -1).toBe(true);
        });

        it('should show the charge device name when the data is provided', function () {

            rootScope.selectedChargeDevice = {
                ChargeDeviceName: 'foo'
            };

            let element = compile('<charging-location-info-pane data="selectedChargeDevice"></charging-location-info-pane>')(rootScope);
            rootScope.$digest();

            let html = element.html();
            expect(html.indexOf('foo') !== -1).toBe(true);
        });
    });
});
