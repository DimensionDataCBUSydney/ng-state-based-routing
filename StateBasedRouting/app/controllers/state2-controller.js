/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/kendo/kendo.all.d.ts"/>
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
    function State2Controller($scope, $http) {
        var _this = this;
        this.$scope = $scope;
        console.log("State2Controller constructed.");
        this.scope = $scope; // AF: No idea why intellisense won't pick up the indirect inheritance from ng.IScope.
        $scope.greeting = "Hello from State 2";
        $scope.groaning = "Bah, Angular World!";
        $scope.gridDataSource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $http.get('/data/state2-data.json').success(function (result) { return options.success(result.data); }).error(function (result) { return options.error(result); });
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
        // Wait until the Kendo grid is ready and provides our scope with a reference to it
        var gotGridInstance = this.scope.$watch("grid", function (newValue) {
            if (!newValue)
                return;
            _this.grid = newValue;
            gotGridInstance(); // So stop watching.
            //this.refreshGrid();
        });
    }
    State2Controller.prototype.refreshGrid = function () {
        if (this.grid) {
            this.$scope.gridDataSource.read();
        }
    };
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
