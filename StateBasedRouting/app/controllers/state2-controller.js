/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/kendo/kendo.all.d.ts"/>
/// <reference path="state-root-controller.ts"/>
var ddcloud;
(function (ddcloud) {
    var sbr;
    (function (sbr) {
        var controllers;
        (function (controllers) {
            /**
             * The State2 application controller.
             */
            var State2Controller = (function () {
                /**
                 * Create a new State2Controller.
                 * @param $scope The controller scope.
                 * @returns {}
                 */
                function State2Controller($scope, $http) {
                    this.$scope = $scope;
                    console.log("State2Controller constructed.");
                    $scope.greeting = "Hello from State 2";
                    $scope.groaning = "Bah, Angular World!";
                    $scope.gridDataSource = new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                $http.get('/data/state2-data.json', {
                                    accessTokenRealm: "http://cloud.dimensiondata.com/demos/ng-state-based-routing/" // Triggers the transparent authentication interceptor.
                                }).success(function (result) { return options.success(result.data); }).error(function (result) { return options.error(result); });
                            }
                        }
                    });
                    $scope.gridOptions = {
                        dataSource: $scope.gridDataSource,
                        columns: [
                            {
                                field: "field1",
                                title: "Field 1"
                            },
                            {
                                field: "field2",
                                title: "Field 2"
                            }
                        ]
                    };
                }
                /**
                 * The controller's dependencies to be injected.
                 */
                State2Controller.$inject = [
                    '$scope',
                    '$http'
                ];
                return State2Controller;
            })();
            angular.module('app').controller('State2Controller', State2Controller);
        })(controllers = sbr.controllers || (sbr.controllers = {}));
    })(sbr = ddcloud.sbr || (ddcloud.sbr = {}));
})(ddcloud || (ddcloud = {}));
