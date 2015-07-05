/// <reference path="../../typings/angularjs/angular.d.ts"/>
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
        // We have to lazily resolve the $http service in order to avoid a circular dependency.
        this.getHttpService = function () {
            return $injector.get("$http");
        };
        // AF: I dislike having to put this in here - member functions *should* see "this" correctly, but only lambdas will capture it.
        this.request = function (config) {
            console.log("TransparentAuthInterceptor - intercepting request...");
            var afterAuthentication = _this.$q.defer();
            if (!config.withAccessToken) {
                console.log("TransparentAuthInterceptor - request is not marked with withAccessToken = true; request will be ignored by this interceptor.");
                afterAuthentication.resolve(config);
                return afterAuthentication.promise;
            }
            // Defer request until token is available.
            console.log("TransparentAuthInterceptor - request will be deferred until access token is available...");
            _this.getAccessTokenAsync().success(function (authResult) {
                console.log("TransparentAuthInterceptor - got access token, adding to request header...");
                config.headers.Authorization = "Bearer " + authResult.token;
                console.log("TransparentAuthInterceptor - resuming original request...");
                afterAuthentication.resolve(config);
            }).error(function (authResult) {
                console.log("TransparentAuthInterceptor - failed to obtain access token, rejecting original request...");
                afterAuthentication.reject(authResult);
            });
            return afterAuthentication.promise;
        };
    }
    /**
     * Asynchronously request an access token.
     * @returns {} A promise that resolves to the authentication result.
     */
    TransparentAuthInterceptor.prototype.getAccessTokenAsync = function () {
        console.log("getAccessTokenAsync...");
        if (!this.accessTokenRequest) {
            console.log("getAccessTokenAsync - no pending access token request; initiating auth request...");
            this.accessTokenRequest = this.getHttpService().get("/data/dummy-token.json");
        }
        return this.accessTokenRequest;
    };
    return TransparentAuthInterceptor;
})();
angular.module('app').factory('TransparentAuthInterceptor', [
    "$q",
    "$injector",
    function ($q, $injector) { return new TransparentAuthInterceptor($q, $injector); }
]).config([
    "$httpProvider",
    function ($httpProvider) { return $httpProvider.interceptors.push("TransparentAuthInterceptor"); }
]);
