/// <reference path="../../typings/angularjs/angular.d.ts"/>

module ddcloud.sbr.controllers {
	/**
	 * Scope definition for the StateRoot application controller.
	 */
	export interface IStateRootControllerScope
		extends ng.IScope
	{
		/**
		 * A greeting to display.
		 */
		greeting: string;
	}

	/**
	 * The root state controller.
	 */
	class StateRootController
	{
		/**
		 * The controller's dependencies to be injected.
		 */
		public static $inject = [
			'$scope'
		];

		/**
		 * Create a new StateRootController.
		 * @param $scope The controller scope.
		 * @returns {} 
		 */
		constructor(private $scope: IStateRootControllerScope)
		{
			console.log("StateRootController constructed.");

			$scope.greeting = "Hello from Root State";
		}
	}

	angular.module('app')
		.controller('StateRootController', StateRootController);
}
