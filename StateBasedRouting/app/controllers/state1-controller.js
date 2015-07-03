/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="state-root-controller.ts"/>
/**
 * The State1 application controller.
 */
var State1Controller = (function () {
    /**
     * Create a new State1Controller.
     * @param $scope The controller scope.
     * @returns {}
     */
    function State1Controller($scope) {
        this.$scope = $scope;
        console.log("State1Controller constructed.");
        $scope.greeting = "Hello from State 1";
        $scope.grunting = "Ugh, Angular World...";
    }
    /**
     * The controller's dependencies to be injected.
     */
    State1Controller.$inject = [
        '$scope'
    ];
    return State1Controller;
})();
angular.module('app').controller('State1Controller', State1Controller);
