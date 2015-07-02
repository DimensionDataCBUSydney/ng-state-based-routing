/// <reference path="../../typings/angularjs/angular.d.ts"/>


interface IMainControllerScope
	extends ng.IScope
{
	greeting: string;
}

class MainController
{
	public static $inject = [
		'$scope'
	];

	constructor(private $scope: IMainControllerScope)
	{
		$scope.greeting = "Hello, Angular World.";
	}
}