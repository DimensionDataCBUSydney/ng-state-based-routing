/// <reference path="../../typings/angularjs/angular.d.ts"/>

/**
 * Scope definition for the main application controller.
 */
interface IMainControllerScope
	extends ng.IScope
{
	/**
	 * A greeting to display.
	 */
	greeting: string;
}

/**
 * The main application controller.
 */
class MainController
{
	/**
	 * The controller's dependencies to be injected.
	 */
	public static $inject = [
		'$scope'
	];

	/**
	 * Create a new MainController.
	 * @param $scope The controller scope.
	 * @returns {} 
	 */
	constructor(private $scope: IMainControllerScope)
	{
		console.log("MainController constructed.");

		$scope.greeting = "Hello, Angular World.";
	}
}

angular.module('app')
	.controller('MainController', MainController);
