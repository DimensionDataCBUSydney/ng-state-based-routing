/// <reference path="../../typings/angularjs/angular.d.ts"/>
/**
 * The main application controller.
 */
var MainController = (function () {
    /**
     * Create a new MainController.
     * @param $scope The controller scope.
     * @returns {}
     */
    function MainController($scope) {
        this.$scope = $scope;
        console.log("MainController constructed.");
        $scope.greeting = "Hello, Angular World.";
    }
    /**
     * The controller's dependencies to be injected.
     */
    MainController.$inject = [
        '$scope'
    ];
    return MainController;
})();
angular.module('app').controller('MainController', MainController);
