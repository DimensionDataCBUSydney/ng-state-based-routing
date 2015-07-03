/// <reference path="../../typings/angularjs/angular.d.ts"/>
/**
 * The root state controller.
 */
var StateRootController = (function () {
    /**
     * Create a new StateRootController.
     * @param $scope The controller scope.
     * @returns {}
     */
    function StateRootController($scope) {
        this.$scope = $scope;
        console.log("StateRootController constructed.");
        $scope.greeting = "Hello from Root State";
    }
    /**
     * The controller's dependencies to be injected.
     */
    StateRootController.$inject = [
        '$scope'
    ];
    return StateRootController;
})();
angular.module('app').controller('StateRootController', StateRootController);
