/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../services/access-token-service.ts"/>
/**
 * HTTP interceptor that performs transparent authentication.
 */
var TransparentAuthInterceptor = (function () {
    /**
     * Create a new TransparentAuthInterceptor.
     * @param $q The Angular promise API
     * @param $injector The angular dependency-injection API.
     * @returns {}
     */
    function TransparentAuthInterceptor($q, $injector) {
        var _this = this;
        this.$q = $q;
        // We have to lazily resolve the access0-token service in order to avoid a circular dependency.
        this.getAccessTokenService = function () {
            return $injector.get("accessTokenService");
        };
        this.request = function (config) {
            console.log("TransparentAuthInterceptor - intercepting request...");
            var afterAuthentication = _this.$q.defer();
            if (!config.accessTokenRealm) {
                console.log("TransparentAuthInterceptor - request is not marked with an accessTokenRealm; request will be ignored by this interceptor.");
                afterAuthentication.resolve(config);
                return afterAuthentication.promise;
            }
            // Defer request until token is available.
            console.log("TransparentAuthInterceptor - request is tagged for access token realm '" + config.accessTokenRealm + "' and will be deferred until access token is available...");
            _this.getAccessTokenAsync(config.accessTokenRealm).then(function (authResult) {
                console.log("TransparentAuthInterceptor - got access token, adding to request header...");
                config.headers.Authorization = "Bearer " + authResult.token;
                console.log("TransparentAuthInterceptor - resuming original request...");
                afterAuthentication.resolve(config);
            }, function (errorResult) {
                console.log("TransparentAuthInterceptor - failed to obtain access token, rejecting original request...");
                afterAuthentication.reject(errorResult);
            });
            return afterAuthentication.promise;
        };
    }
    /**
     * Asynchronously request an access token.
     * @param realm The realm identifier representing the target audience for the access token.
     * @returns {} A promise that resolves to the authentication result.
     */
    TransparentAuthInterceptor.prototype.getAccessTokenAsync = function (realm) {
        console.log("getAccessTokenAsync...");
        if (!realm)
            throw new Error("Must specify a valid realm identifier for the access token's audience.");
        if (!this.accessTokenRequest) {
            console.log("getAccessTokenAsync - no pending access token request; initiating auth request...");
            this.accessTokenRequest = this.getAccessTokenService().requestAccessTokenAsync(realm);
        }
        return this.accessTokenRequest;
    };
    /**
     * Dependencies to be injected via constructor.
     */
    TransparentAuthInterceptor.$inject = [
        "$q",
        "$injector"
    ];
    return TransparentAuthInterceptor;
})();
angular.module('app').service("transparentAuthInterceptor", TransparentAuthInterceptor).config([
    "$httpProvider",
    function ($httpProvider) { return $httpProvider.interceptors.push("transparentAuthInterceptor"); }
]);
