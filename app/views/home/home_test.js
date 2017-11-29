'use strict';

describe('myApp.home module', function () {

    let scope, httpBackend, createController;

    let mockChargeDeviceData = {
        ChargeDevice: [{
            "ChargeDeviceId": "1",
            "ChargeDeviceName": "foo1",
            "Connector": [{
                "ConnectorId": "1",
                "ConnectorType": "3-pin Type G (BS1363)",
                "ChargeMethod": "Single Phase AC",
                "ChargePointStatus": "In service"
            }, {
                "ConnectorId": "2",
                "ConnectorType": "Type 2 Mennekes (IEC62196)",
                "ChargeMethod": "Single Phase AC",
                "ChargePointStatus": "In service"
            }
            ],
            "ChargeDeviceLocation": {
                "Latitude": "51.480920",
                "Longitude": "-0.419318"
            },
            "SubscriptionRequiredFlag": false,
            "AccessRestrictionFlag": false
        }, {
            "ChargeDeviceId": "2",
            "ChargeDeviceName": "foo2",
            "Connector": [{
                "ConnectorId": "1",
                "ConnectorType": "JEVS G105 (CHAdeMO) DC",
                "ChargeMethod": "Single Phase AC",
                "ChargePointStatus": "In service"
            }, {
                "ConnectorId": "2",
                "ConnectorType": "Type 2 Mennekes (IEC62196)",
                "ChargeMethod": "Single Phase AC",
                "ChargePointStatus": "In service"
            }
            ],
            "ChargeDeviceLocation": {
                "Latitude": "51.480920",
                "Longitude": "-0.419318"
            },
            // This charge device should never result in a marker as both subscription
            // and access restriction flags are present
            "SubscriptionRequiredFlag": true,
            "AccessRestrictionFlag": true
        }, {
            "ChargeDeviceId": "3",
            "ChargeDeviceName": "foo3",
            "Connector": [{
                "ConnectorId": "1",
                "ConnectorType": "JEVS G105 (CHAdeMO) DC",
                "ChargeMethod": "Single Phase AC",
                "ChargePointStatus": "In service"
            }, {
                "ConnectorId": "2",
                "ConnectorType": "Type 3 Scame (IEC62196)",
                "ChargeMethod": "Single Phase AC",
                "ChargePointStatus": "In service"
            }
            ],
            "ChargeDeviceLocation": {
                "Latitude": "51.480920",
                "Longitude": "-0.419318"
            },
            "SubscriptionRequiredFlag": false,
            "AccessRestrictionFlag": false
        }
        ]
    };

    beforeEach(module('myApp.home'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('HomeCtrl', {
                '$scope': scope,
                uiGmapGoogleMapApi: {then: function(){}}
            });
        };
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('home controller', function () {

        it('should expect home controller to be defined', inject(function () {
            let controller = createController();

            httpBackend.expect('GET', 'data/national_charge_point_registry/registry.json')
                .respond({});

            httpBackend.flush();

            expect(controller).toBeDefined();
        }));

        it('should create markers for charge devices without access and subscription flags present', inject(function () {
            let controller = createController();

            httpBackend.expect('GET', 'data/national_charge_point_registry/registry.json')
                .respond(mockChargeDeviceData);

            httpBackend.flush();

            expect(scope.chargeDevices).toEqual(scope.chargeDevices);
            expect(scope.markers.length).toEqual(2);
        }));

        it('should expect markers to be created for the charge devices which contain the selected type', inject(function () {
            let controller = createController();

            httpBackend.expect('GET', 'data/national_charge_point_registry/registry.json')
                .respond(mockChargeDeviceData);

            httpBackend.flush();

            scope.selectedConnectorType = 'Type 3 Scame (IEC62196)';
            scope.selectedConnectorTypeChange();

            expect(scope.chargeDevices).toEqual(scope.chargeDevices);
            expect(scope.markers.length).toEqual(1);
        }));

        it('should expect markers to be created for all charge devices when "Show All" is selected', inject(function () {
            let controller = createController();

            httpBackend.expect('GET', 'data/national_charge_point_registry/registry.json')
                .respond(mockChargeDeviceData);

            httpBackend.flush();

            scope.selectedConnectorType = 'Show All';
            scope.selectedConnectorTypeChange();

            expect(scope.chargeDevices).toEqual(scope.chargeDevices);
            expect(scope.markers.length).toEqual(2);
        }));
    });
});