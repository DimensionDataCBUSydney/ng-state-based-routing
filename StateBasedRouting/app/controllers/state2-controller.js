/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="state-root-controller.ts"/>
/**
 * The State2 application controller.
 */
var State2Controller = (function () {
    /**
     * Create a new State2Controller.
     * @param $scope The controller scope.
     * @returns {}
     */
    function State2Controller($scope) {
        this.$scope = $scope;
        console.log("State2Controller constructed.");
        $scope.greeting = "Hello from State 2";
        $scope.groaning = "Bah, Angular World!";
    }
    /**
     * The controller's dependencies to be injected.
     */
    State2Controller.$inject = [
        '$scope'
    ];
    return State2Controller;
})();
angular.module('app').controller('State2Controller', State2Controller);
