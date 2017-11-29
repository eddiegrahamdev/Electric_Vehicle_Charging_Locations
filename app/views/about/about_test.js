'use strict';

describe('myApp.about module', function () {
    let scope, createController;

    beforeEach(module('myApp.about'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function() {
            return $controller('AboutCtrl', {'$scope': scope});
        };
    }));

    describe('about controller', function () {

        it('should expect about controller to be defined', inject(function () {
            let controller = createController();

            expect(controller).toBeDefined();
        }));
    });
});