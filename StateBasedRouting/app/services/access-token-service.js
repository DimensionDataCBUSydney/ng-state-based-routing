/// <reference path="../../typings/angularjs/angular.d.ts"/>
var AccessTokenService = (function () {
    /**
     * Create a new instance of the access token service.
     * @param $http The HTTP service.
     * @returns {}
     */
    function AccessTokenService($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    /**
     * Request an access token for the specified realm.
     * @param realm The realm identifier representing the target audience for the access token.
     * @returns {}
     */
    AccessTokenService.prototype.requestAccessTokenAsync = function (realm) {
        if (!realm)
            throw new Error("Must specify a valid realm identifier for the access token's audience.");
        if (!this.tokenServiceUrl)
            throw new Error("URL for security token service has not been configured.");
        if (!this.clientId)
            throw new Error("Client Id for requesting access tokens has not been configured.");
        if (!this.secret)
            throw new Error("Shared secret for requesting access tokens has not been configured.");
        var accessTokenResult = this.$q.defer();
        this.$http.get(this.tokenServiceUrl).success(function (result) {
            if (result.status === "success") {
                accessTokenResult.resolve(result);
            }
            else {
                accessTokenResult.reject(result);
            }
        }).error(function (result) {
            accessTokenResult.reject({
                status: "failed",
                errorResponse: result
            });
        });
        return accessTokenResult.promise;
    };
    /**
     * Dependencies to be injected via constructor.
     */
    AccessTokenService.$inject = [
        "$http",
        "$q"
    ];
    return AccessTokenService;
})();
angular.module('app').service("accessTokenService", AccessTokenService);
