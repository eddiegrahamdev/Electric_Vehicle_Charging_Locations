'use strict';

describe('myApp.home module', function () {

    let scope, httpBackend, createController;
    let mockChargeDeviceData = {
        ChargeDevice: [
            {"ChargeDeviceId":"477da0983d95bcf2049b7016f6e56c9f","ChargeDeviceRef":"Shell Recharge Why","ChargeDeviceName":"UKALLEGO000100","ChargeDeviceText":null,"ChargeDeviceLocation":{"Latitude":"51.490024","Longitude":"-0.474013","Address":{"SubBuildingName":null,"BuildingName":"","BuildingNumber":"408","Thoroughfare":"Godstone Road","Street":"","DoubleDependantLocality":null,"DependantLocality":null,"PostTown":"WHYTELEAFE","County":"United Kingdom","PostCode":"CR3 0BB","Country":"gb","UPRN":""},"LocationShortDescription":null,"LocationLongDescription":""},"ChargeDeviceManufacturer":"Siemens","ChargeDeviceModel":"","PublishStatusID":"1","DateCreated":"2017-10-02 09:34:45","DateUpdated":"2017-10-02 09:34:45","Attribution":"Allego B.V.","DateDeleted":"n/a","Connector":[{"ConnectorId":"01","ConnectorType":"JEVS G105 (CHAdeMO) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"},{"ConnectorId":"02","ConnectorType":"Type 2 Combo (IEC62196) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"},{"ConnectorId":"03","ConnectorType":"Type 2 Mennekes (IEC62196)","RatedOutputkW":"43.0","RatedOutputVoltage":"400","RatedOutputCurrent":"63","ChargeMethod":"Three Phase AC","ChargeMode":"3","ChargePointStatus":"In service","TetheredCable":"1","Information":"22kWh in duo use with DC","Validated":"0"}],"DeviceOwner":{"OrganisationName":"Allego B.V.","SchemeCode":"allego","Website":"www.allego.eu","TelephoneNo":"08000294601"},"DeviceController":{"OrganisationName":"*No Controller","SchemeCode":"C219","Website":"http://www.national-charge-point-registry.uk/","TelephoneNo":"0300 777 0001"},"DeviceAccess":[],"DeviceNetworks":"Allego B.V.","ChargeDeviceStatus":"In service","PublishStatus":"Published","DeviceValidated":"0","RecordModerated":"N","RecordLastUpdated":null,"RecordLastUpdatedBy":"","PaymentRequiredFlag":true,"PaymentDetails":"Direct payment via Smoov App","SubscriptionRequiredFlag":false,"SubscriptionDetails":"","ParkingFeesFlag":false,"ParkingFeesDetails":"","ParkingFeesUrl":"","AccessRestrictionFlag":false,"AccessRestrictionDetails":"","PhysicalRestrictionFlag":false,"PhysicalRestrictionText":"","OnStreetFlag":false,"LocationType":"Service station","Bearing":null,"Accessible24Hours":false},
            {"ChargeDeviceId":"34657b087cb522ecec1cc1ead4026974","ChargeDeviceRef":"INS68704","ChargeDeviceName":"Chafford Hundred 2","ChargeDeviceText":null,"ChargeDeviceLocation":{"Latitude":"51.490555","Longitude":"0.291519","Address":{"SubBuildingName":null,"BuildingName":"Bannatyne Health Club and Spa","BuildingNumber":"","Thoroughfare":"Howard Road","Street":"","DoubleDependantLocality":null,"DependantLocality":null,"PostTown":"Chafford Hundred","County":"Essex","PostCode":"RM16 6YJ","Country":"gb","UPRN":""},"LocationShortDescription":null,"LocationLongDescription":"Station can be found within the car park of Bannatyne Gym. This station is available for all public use."},"ChargeDeviceManufacturer":"Other","ChargeDeviceModel":"CPE200T-S-CHD-CMB","PublishStatusID":"1","DateCreated":"2017-11-23 11:33:59","DateUpdated":"2017-11-23 16:36:28","Attribution":"InstaVolt Ltd","DateDeleted":"n/a","Connector":[{"ConnectorId":"CHA003-001-002","ConnectorType":"JEVS G105 (CHAdeMO) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"},{"ConnectorId":"CCS003-001-002","ConnectorType":"Type 2 Combo (IEC62196) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"}],"DeviceOwner":{"OrganisationName":"InstaVolt Ltd","SchemeCode":"INSTAV","Website":"instavolt.co.uk","TelephoneNo":"01256 305900"},"DeviceController":{"OrganisationName":"*No Controller","SchemeCode":"C219","Website":"http://www.national-charge-point-registry.uk/","TelephoneNo":"0300 777 0001"},"DeviceAccess":[],"DeviceNetworks":"InstaVolt Ltd","ChargeDeviceStatus":"In service","PublishStatus":"Published","DeviceValidated":"0","RecordModerated":"Y","RecordLastUpdated":"2017-11-23 16:36:28","RecordLastUpdatedBy":"InstaVolt Ltd","PaymentRequiredFlag":true,"PaymentDetails":"£0.35p/KWh or a maximum of £18 per session","SubscriptionRequiredFlag":false,"SubscriptionDetails":"","ParkingFeesFlag":false,"ParkingFeesDetails":"","ParkingFeesUrl":"","AccessRestrictionFlag":false,"AccessRestrictionDetails":"","PhysicalRestrictionFlag":false,"PhysicalRestrictionText":"","OnStreetFlag":false,"LocationType":"Leisure centre","Bearing":null,"Accessible24Hours":false}
        ]
    };

    let mockChargeDeviceDataWithAccessAndSubFlag = {
        ChargeDevice: [
            {"ChargeDeviceId":"477da0983d95bcf2049b7016f6e56c9f","ChargeDeviceRef":"Shell Recharge Why","ChargeDeviceName":"UKALLEGO000100","ChargeDeviceText":null,"ChargeDeviceLocation":{"Latitude":"51.490024","Longitude":"-0.474013","Address":{"SubBuildingName":null,"BuildingName":"","BuildingNumber":"408","Thoroughfare":"Godstone Road","Street":"","DoubleDependantLocality":null,"DependantLocality":null,"PostTown":"WHYTELEAFE","County":"United Kingdom","PostCode":"CR3 0BB","Country":"gb","UPRN":""},"LocationShortDescription":null,"LocationLongDescription":""},"ChargeDeviceManufacturer":"Siemens","ChargeDeviceModel":"","PublishStatusID":"1","DateCreated":"2017-10-02 09:34:45","DateUpdated":"2017-10-02 09:34:45","Attribution":"Allego B.V.","DateDeleted":"n/a","Connector":[{"ConnectorId":"01","ConnectorType":"JEVS G105 (CHAdeMO) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"},{"ConnectorId":"02","ConnectorType":"Type 2 Combo (IEC62196) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"},{"ConnectorId":"03","ConnectorType":"Type 2 Mennekes (IEC62196)","RatedOutputkW":"43.0","RatedOutputVoltage":"400","RatedOutputCurrent":"63","ChargeMethod":"Three Phase AC","ChargeMode":"3","ChargePointStatus":"In service","TetheredCable":"1","Information":"22kWh in duo use with DC","Validated":"0"}],"DeviceOwner":{"OrganisationName":"Allego B.V.","SchemeCode":"allego","Website":"www.allego.eu","TelephoneNo":"08000294601"},"DeviceController":{"OrganisationName":"*No Controller","SchemeCode":"C219","Website":"http://www.national-charge-point-registry.uk/","TelephoneNo":"0300 777 0001"},"DeviceAccess":[],"DeviceNetworks":"Allego B.V.","ChargeDeviceStatus":"In service","PublishStatus":"Published","DeviceValidated":"0","RecordModerated":"N","RecordLastUpdated":null,"RecordLastUpdatedBy":"","PaymentRequiredFlag":true,"PaymentDetails":"Direct payment via Smoov App","SubscriptionRequiredFlag":false,"SubscriptionDetails":"","ParkingFeesFlag":false,"ParkingFeesDetails":"","ParkingFeesUrl":"","AccessRestrictionFlag":false,"AccessRestrictionDetails":"","PhysicalRestrictionFlag":false,"PhysicalRestrictionText":"","OnStreetFlag":false,"LocationType":"Service station","Bearing":null,"Accessible24Hours":false},
            {"ChargeDeviceId":"34657b087cb522ecec1cc1ead4026974","ChargeDeviceRef":"INS68704","ChargeDeviceName":"Chafford Hundred 2","ChargeDeviceText":null,"ChargeDeviceLocation":{"Latitude":"51.490555","Longitude":"0.291519","Address":{"SubBuildingName":null,"BuildingName":"Bannatyne Health Club and Spa","BuildingNumber":"","Thoroughfare":"Howard Road","Street":"","DoubleDependantLocality":null,"DependantLocality":null,"PostTown":"Chafford Hundred","County":"Essex","PostCode":"RM16 6YJ","Country":"gb","UPRN":""},"LocationShortDescription":null,"LocationLongDescription":"Station can be found within the car park of Bannatyne Gym. This station is available for all public use."},"ChargeDeviceManufacturer":"Other","ChargeDeviceModel":"CPE200T-S-CHD-CMB","PublishStatusID":"1","DateCreated":"2017-11-23 11:33:59","DateUpdated":"2017-11-23 16:36:28","Attribution":"InstaVolt Ltd","DateDeleted":"n/a","Connector":[{"ConnectorId":"CHA003-001-002","ConnectorType":"JEVS G105 (CHAdeMO) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"},{"ConnectorId":"CCS003-001-002","ConnectorType":"Type 2 Combo (IEC62196) DC","RatedOutputkW":"50.0","RatedOutputVoltage":"400","RatedOutputCurrent":"125","ChargeMethod":"DC","ChargeMode":"4","ChargePointStatus":"In service","TetheredCable":"1","Information":"","Validated":"0"}],"DeviceOwner":{"OrganisationName":"InstaVolt Ltd","SchemeCode":"INSTAV","Website":"instavolt.co.uk","TelephoneNo":"01256 305900"},"DeviceController":{"OrganisationName":"*No Controller","SchemeCode":"C219","Website":"http://www.national-charge-point-registry.uk/","TelephoneNo":"0300 777 0001"},"DeviceAccess":[],"DeviceNetworks":"InstaVolt Ltd","ChargeDeviceStatus":"In service","PublishStatus":"Published","DeviceValidated":"0","RecordModerated":"Y","RecordLastUpdated":"2017-11-23 16:36:28","RecordLastUpdatedBy":"InstaVolt Ltd","PaymentRequiredFlag":true,"PaymentDetails":"£0.35p/KWh or a maximum of £18 per session","SubscriptionRequiredFlag":true,"SubscriptionDetails":"","ParkingFeesFlag":false,"ParkingFeesDetails":"","ParkingFeesUrl":"","AccessRestrictionFlag":true,"AccessRestrictionDetails":"","PhysicalRestrictionFlag":false,"PhysicalRestrictionText":"","OnStreetFlag":false,"LocationType":"Leisure centre","Bearing":null,"Accessible24Hours":false}
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

        it('should expect 2 markers defined', inject(function () {
            let controller = createController();

            httpBackend.expect('GET', 'data/national_charge_point_registry/registry.json')
                .respond(mockChargeDeviceData);

            httpBackend.flush();

            expect(scope.chargeDevices).toEqual(mockChargeDeviceData.ChargeDevice);
            expect(scope.markers.length).toEqual(2);
        }));

        it('should expect 1 marker defined', inject(function () {
            let controller = createController();

            httpBackend.expect('GET', 'data/national_charge_point_registry/registry.json')
                .respond(mockChargeDeviceDataWithAccessAndSubFlag);

            httpBackend.flush();

            expect(scope.chargeDevices).toEqual(scope.chargeDevices);
            expect(scope.markers.length).toEqual(1);
        }));
    });
});