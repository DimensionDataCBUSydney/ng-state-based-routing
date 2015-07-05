/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../services/access-token-service.ts"/>

module ddcloud.sbr.controllers {
	/**
	 * Scope definition for the main application controller.
	 */
	export interface IMainControllerScope
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
			'$scope',
			"accessTokenService"
		];

		/**
		 * Create a new MainController.
		 * @param $scope The controller scope.
		 * @returns {} 
		 */
		constructor(private $scope: IMainControllerScope, accessTokenService: IAccessTokenService)
		{
			console.log("MainController constructed.");

			$scope.greeting = "Hello, Angular World.";

			// STS client configuration
			accessTokenService.tokenServiceUrl = "/data/dummy-token.json";
			accessTokenService.clientId = "DummyClientId";
			accessTokenService.secret = "c29saXBzaXN0IG5hdGlvbg==";
		}
	}

	angular.module('app')
		.controller('MainController', MainController);
}