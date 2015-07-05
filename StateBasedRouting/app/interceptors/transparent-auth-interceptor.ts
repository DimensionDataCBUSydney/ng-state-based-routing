/// <reference path="../../typings/angularjs/angular.d.ts"/>

/**
 * Transparent authentication extensions to the standard Angular HTTP request configuration
 */
interface ITransparentAuthRequestConfig extends ng.IRequestConfig {
	/**
	 * Should the interceptor obtain an access token and add it to the request?
	 */
	withAccessToken?: boolean;
}

/**
 * Represents the result of a request for a security token.
 */
interface IAuthTokenResult {
	/**
	 * The result status ("success" means good to go).
	 */
	status: string;

	/**
	 * The security token, as a Base64-encoded string.
	 */
	token: string;
}

/**
 * HTTP interceptor that performs transparent authentication.
 */
class TransparentAuthInterceptor
{
	/**
	 * Promise representing most recent asynchronous request for an access token.
	 */
	private accessTokenRequest: ng.IHttpPromise<IAuthTokenResult>;
	
	/**
	 * Create a new TransparentAuthInterceptor.
	 * @param $q The Angular promise API
	 * @param $injector The angular dependency-injection API. 
	 * @returns {} 
	 */
	constructor(private $q: ng.IQService, $injector: ng.auto.IInjectorService) {
		// We have to lazily resolve the $http service in order to avoid a circular dependency.
		this.getHttpService = () => {
			return $injector.get("$http");
		};

		// AF: I dislike having to put this in here - member functions *should* see "this" correctly, but only lambdas will capture it.
		this.request = config => {
			console.log("TransparentAuthInterceptor - intercepting request...");

			var afterAuthentication = this.$q.defer<ng.IRequestConfig>();
			if (!config.withAccessToken) {
				console.log("TransparentAuthInterceptor - request is not marked with withAccessToken = true; request will be ignored by this interceptor.");

				afterAuthentication.resolve(config);

				return afterAuthentication.promise;
			}

			// Defer request until token is available.
			console.log("TransparentAuthInterceptor - request will be deferred until access token is available...");
			this.getAccessTokenAsync()
				.success(
					authResult => {
						console.log("TransparentAuthInterceptor - got access token, adding to request header...");

						config.headers.Authorization = "Bearer " + authResult.token;

						console.log("TransparentAuthInterceptor - resuming original request...");
						afterAuthentication.resolve(config);
					}
				)
				.error(
					authResult => {
						console.log("TransparentAuthInterceptor - failed to obtain access token, rejecting original request...");
						afterAuthentication.reject(authResult);
					}
				);

			return afterAuthentication.promise;
		};
	}

	/**
	 * Intercept an HTTP request.
	 * Returns a promise that resolves once authentication is complete (or immediately, if the request configuration has a "withAccessToken" property set to true) 
	 * @param config The HTTP request configuration.
	 * @returns {} A promise that will resolve as updated configuration once authentication is complete.
	 * @see ITransparentAuthRequestConfig 
	 */
	public request: (config: ITransparentAuthRequestConfig) => ng.IPromise<ng.IRequestConfig>;

	/**
	 * Get the Angular HTTP service.
	 * 
	 * Lazily-resolved because capture in the constructor would lead to a circular dependency
	 * @returns {} The $http service.
	 */
	private getHttpService: () => ng.IHttpService;

	/**
	 * Asynchronously request an access token.
	 * @returns {} A promise that resolves to the authentication result.
	 */
	private getAccessTokenAsync(): ng.IHttpPromise<IAuthTokenResult> {
		console.log("getAccessTokenAsync...");

		if (!this.accessTokenRequest) {
			console.log("getAccessTokenAsync - no pending access token request; initiating auth request...");
			
			this.accessTokenRequest = this.getHttpService().get<IAuthTokenResult>("/data/dummy-token.json");
		}

		return this.accessTokenRequest;
	}
}

angular.module('app')
	.factory(
		'TransparentAuthInterceptor',
		[
			"$q",
			"$injector",
			($q, $injector) => new TransparentAuthInterceptor($q, $injector)
		]
	)
	.config(
		[
			"$httpProvider",
			($httpProvider: ng.IHttpProvider) => $httpProvider.interceptors.push("TransparentAuthInterceptor")
		]
	);
