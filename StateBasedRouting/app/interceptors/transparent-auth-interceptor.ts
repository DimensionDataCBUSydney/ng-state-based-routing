/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../services/access-token-service.ts"/>

module ddcloud.sbr.interceptors {
	import services = ddcloud.sbr.services;
	
	/**
	 * Transparent authentication extensions to the standard Angular HTTP request configuration
	 */
	interface ITransparentAuthRequestConfig extends ng.IRequestConfig {
		/**
		 * The realm identifier of an audience for which the request's access token must be valid.
		 */
		accessTokenRealm?: string;
	}

	/**
	 * HTTP interceptor that performs transparent authentication.
	 */
	class TransparentAuthInterceptor
	{
		/**
		 * Promise representing most recent asynchronous request for an access token.
		 */
		private accessTokenRequest: ng.IPromise<services.IAccessTokenResult>;
	
		/**
		 * Dependencies to be injected via constructor.
		 */
		public static $inject = [
			"$q",
			"$injector"
		];

		/**
		 * Create a new TransparentAuthInterceptor.
		 * @param $q The Angular promise API
		 * @param $injector The angular dependency-injection API. 
		 * @returns {} 
		 */
		constructor(private $q: ng.IQService, $injector: ng.auto.IInjectorService) {
			// We have to lazily resolve the access0-token service in order to avoid a circular dependency.
			this.getAccessTokenService = () => {
				return $injector.get("accessTokenService");
			};

			this.request = config => {
				console.log("TransparentAuthInterceptor - intercepting request...");

				var afterAuthentication = this.$q.defer<ng.IRequestConfig>();
				if (!config.accessTokenRealm) {
					console.log("TransparentAuthInterceptor - request is not marked with an accessTokenRealm; request will be ignored by this interceptor.");

					afterAuthentication.resolve(config);

					return afterAuthentication.promise;
				}

				// Defer request until token is available.
				console.log("TransparentAuthInterceptor - request is tagged for access token realm '" + config.accessTokenRealm +"' and will be deferred until access token is available...");
				this.getAccessTokenAsync(config.accessTokenRealm)
					.then(
						authResult => {
							console.log("TransparentAuthInterceptor - got access token, adding to request header...");

							config.headers.Authorization = "Bearer " + authResult.token;

							console.log("TransparentAuthInterceptor - resuming original request...");
							afterAuthentication.resolve(config);
						},
						errorResult => {
							console.log("TransparentAuthInterceptor - failed to obtain access token, rejecting original request...");

							afterAuthentication.reject(errorResult);
						}
					);

				return afterAuthentication.promise;
			};
		}

		/**
		 * Intercept an HTTP request.
		 * Returns a promise that resolves once authentication is complete (or immediately, if the request configuration has a "accessTokenRealm" property set to true) 
		 * @param config The HTTP request configuration.
		 * @returns {} A promise that will resolve as updated configuration once authentication is complete.
		 * @see ITransparentAuthRequestConfig 
		 */
		public request: (config: ITransparentAuthRequestConfig) => ng.IPromise<ng.IRequestConfig>;

		/**
		 * Get the access-token service.
		 * 
		 * Lazily-resolved because capture in the constructor would lead to a circular dependency
		 * @returns {} The $http service.
		 */
		private getAccessTokenService: () => services.IAccessTokenService;

		/**
		 * Asynchronously request an access token.
		 * @param realm The realm identifier representing the target audience for the access token.
		 * @returns {} A promise that resolves to the authentication result.
		 */
		private getAccessTokenAsync(realm: string): ng.IPromise<services.IAccessTokenResult> {
			console.log("getAccessTokenAsync...");

			if (!realm)
				throw new Error("Must specify a valid realm identifier for the access token's audience.");

			if (!this.accessTokenRequest) {
				console.log("getAccessTokenAsync - no pending access token request; initiating auth request...");
			
				this.accessTokenRequest = this.getAccessTokenService().requestAccessTokenAsync(realm);
			}

			return this.accessTokenRequest;
		}
	}

	angular.module('app')
		.service("transparentAuthInterceptor", TransparentAuthInterceptor)
		.config(
			[
				"$httpProvider",
				($httpProvider: ng.IHttpProvider) => $httpProvider.interceptors.push("transparentAuthInterceptor")
			]
		);
}
