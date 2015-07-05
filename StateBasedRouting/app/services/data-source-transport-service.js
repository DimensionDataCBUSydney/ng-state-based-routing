/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/kendo/kendo.all.d.ts"/>
var ddcloud;
(function (ddcloud) {
    var sbr;
    (function (sbr) {
        var services;
        (function (services) {
            /**
             * Well-known actions for a Kendo data source transport.
             */
            (function (DataSourceTransportActions) {
                /**
                 * No actions are supported by the data source.
                 */
                DataSourceTransportActions[DataSourceTransportActions["None"] = 0] = "None";
                /**
                 * Can create new items in the data source ("POST").
                 */
                DataSourceTransportActions[DataSourceTransportActions["Create"] = 1] = "Create";
                /**
                 * Can read from the data source ("GET").
                 */
                DataSourceTransportActions[DataSourceTransportActions["Read"] = 2] = "Read";
                /**
                 * Can update items in the data source ("PUT").
                 */
                DataSourceTransportActions[DataSourceTransportActions["Update"] = 4] = "Update";
                /**
                 * Can delete items in the data source ("DELETE").
                 */
                DataSourceTransportActions[DataSourceTransportActions["Delete"] = 5] = "Delete";
            })(services.DataSourceTransportActions || (services.DataSourceTransportActions = {}));
            var DataSourceTransportActions = services.DataSourceTransportActions;
        })(services = sbr.services || (sbr.services = {}));
    })(sbr = ddcloud.sbr || (ddcloud.sbr = {}));
})(ddcloud || (ddcloud = {}));
