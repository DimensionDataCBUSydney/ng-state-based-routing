/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="state-root-controller.ts"/>

/**
 * Scope definition for the State1 application controller.
 */
interface IState1ControllerScope
	extends IStateRootControllerScope
{
	/**
	 * A grunting to display.
	 */
	grunting: string;
}

/**
 * The State1 application controller.
 */
class State1Controller
{
	/**
	 * The controller's dependencies to be injected.
	 */
	public static $inject = [
		'$scope'
	];

	/**
	 * Create a new State1Controller.
	 * @param $scope The controller scope.
	 * @returns {} 
	 */
	constructor(private $scope: IState1ControllerScope)
	{
		console.log("State1Controller constructed.");

		$scope.greeting = "Hello from State 1";
		$scope.grunting = "Ugh, Angular World...";
	}
}

angular.module('app')
	.controller('State1Controller', State1Controller);
