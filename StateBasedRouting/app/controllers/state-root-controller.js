/// <reference path="../../typings/angularjs/angular.d.ts"/>
var ddcloud;
(function (ddcloud) {
    var sbr;
    (function (sbr) {
        var controllers;
        (function (controllers) {
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
        })(controllers = sbr.controllers || (sbr.controllers = {}));
    })(sbr = ddcloud.sbr || (ddcloud.sbr = {}));
})(ddcloud || (ddcloud = {}));
