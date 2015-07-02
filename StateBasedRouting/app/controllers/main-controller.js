/// <reference path="../../typings/angularjs/angular.d.ts"/>
var MainController = (function () {
    function MainController($scope) {
        this.$scope = $scope;
        $scope.greeting = "Hello, Angular World.";
    }
    MainController.$inject = [
        '$scope'
    ];
    return MainController;
})();
