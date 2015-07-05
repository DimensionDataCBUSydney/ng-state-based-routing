/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../services/access-token-service.ts"/>
var ddcloud;
(function (ddcloud) {
    var sbr;
    (function (sbr) {
        var controllers;
        (function (controllers) {
            /**
             * The main application controller.
             */
            var MainController = (function () {
                /**
                 * Create a new MainController.
                 * @param $scope The controller scope.
                 * @returns {}
                 */
                function MainController($scope, accessTokenService) {
                    this.$scope = $scope;
                    console.log("MainController constructed.");
                    $scope.greeting = "Hello, Angular World.";
                    // STS client configuration
                    accessTokenService.tokenServiceUrl = "/data/dummy-token.json";
                    accessTokenService.clientId = "DummyClientId";
                    accessTokenService.secret = "c29saXBzaXN0IG5hdGlvbg==";
                }
                /**
                 * The controller's dependencies to be injected.
                 */
                MainController.$inject = [
                    '$scope',
                    "accessTokenService"
                ];
                return MainController;
            })();
            angular.module('app').controller('MainController', MainController);
        })(controllers = sbr.controllers || (sbr.controllers = {}));
    })(sbr = ddcloud.sbr || (ddcloud.sbr = {}));
})(ddcloud || (ddcloud = {}));
