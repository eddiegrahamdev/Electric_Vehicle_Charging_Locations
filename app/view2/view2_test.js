'use strict';

describe('myApp.view2 module', function () {

    beforeEach(module('myApp.view2'));

    describe('view2 controller', function () {

        it('should ....', inject(function ($controller, $rootScope) {
            let scope = $rootScope.$new();
            let view2Ctrl = $controller('View2Ctrl', {$scope: scope});
            expect(view2Ctrl).toBeDefined();
        }));
    });
});