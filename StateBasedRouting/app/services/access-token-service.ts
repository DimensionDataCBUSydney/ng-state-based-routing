/// <reference path="../../typings/angularjs/angular.d.ts"/>

/**
 * Represents the result of a request for a security token.
 */
interface IAccessTokenResult {
	/**
	 * The result status ("success" means good to go).
	 */
	status: string;

	/**
	 * The security token, as a Base64-encoded string.
	 */
	token?: string;

	/**
	 * The UTC date / time at which the access token will expire.
	 */
	validToUtc?: Date;

	/**
	 * The error response (if available, and status is not "success").
	 */
	errorResponse?: any;
}

/**
 * Represents a service used to obtain access tokens.
 */
interface IAccessTokenService {
	/**
	 * The URL of the STS end-point used to request access tokens.
	 */
	tokenServiceUrl: string;

	/**
	 * The client Id used to request access tokens.
	 */
	clientId: string;

	/**
	 * The shared secret used to request access tokens.
	 */
	secret: string;

	/**
	 * Request an access token for the specified realm.
	 * @param realm The realm identifier representing the target audience for the access token.
	 * @returns {} 
	 */
	requestAccessTokenAsync(realm: string): ng.IPromise<IAccessTokenResult>;
}

class AccessTokenService implements IAccessTokenService {
	/**
	 * The URL of the STS end-point used to request access tokens.
	 */
	public tokenServiceUrl: string;

	/**
	 * The client Id used to request access tokens.
	 */
	public clientId: string;

	/**
	 * The secret used to request access tokens.
	 */
	public secret: string;

	/**
	 * Dependencies to be injected via constructor.
	 */
	public static $inject = [
		"$http",
		"$q"
	];

	/**
	 * Create a new instance of the access token service.
	 * @param $http The HTTP service.
	 * @returns {} 
	 */
	public constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
	}
	
	/**
	 * Request an access token for the specified realm.
	 * @param realm The realm identifier representing the target audience for the access token.
	 * @returns {} 
	 */
	requestAccessTokenAsync(realm: string): ng.IPromise<IAccessTokenResult> {
		if (!realm) // Currently unused, though, because we're just loading the access token from a JSON file.
			throw new Error("Must specify a valid realm identifier for the access token's audience.");

		if (!this.tokenServiceUrl)
			throw new Error("URL for security token service has not been configured.");

		if (!this.clientId)
			throw new Error("Client Id for requesting access tokens has not been configured.");

		if (!this.secret)
			throw new Error("Shared secret for requesting access tokens has not been configured.");

		var accessTokenResult = this.$q.defer<IAccessTokenResult>();
		
		this.$http.get<IAccessTokenResult>(this.tokenServiceUrl)
			.success(
				result => {
					if (result.status === "success") {
						accessTokenResult.resolve(result);
					}
					else {
						accessTokenResult.reject(result);	
					}
				}
			)
			.error(
				result => {
					accessTokenResult.reject(
						<IAccessTokenResult>{
							status: "failed",
							errorResponse: result
						}
					);
				}
			);

		return accessTokenResult.promise;
	}
}

angular.module('app')
	.service("accessTokenService", AccessTokenService);
