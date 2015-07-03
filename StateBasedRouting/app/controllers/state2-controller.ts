/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="state-root-controller.ts"/>

/**
 * Scope definition for the State2 application controller.
 */
interface IState2ControllerScope
	extends IStateRootControllerScope
{
	/**
	 * A groaning to display.
	 */
	groaning: string;
}

/**
 * The State2 application controller.
 */
class State2Controller
{
	/**
	 * The controller's dependencies to be injected.
	 */
	public static $inject = [
		'$scope'
	];

	/**
	 * Create a new State2Controller.
	 * @param $scope The controller scope.
	 * @returns {} 
	 */
	constructor(private $scope: IState2ControllerScope)
	{
		console.log("State2Controller constructed.");

		$scope.greeting = "Hello from State 2";
		$scope.groaning = "Bah, Angular World!";
	}
}

angular.module('app')
	.controller('State2Controller', State2Controller);
