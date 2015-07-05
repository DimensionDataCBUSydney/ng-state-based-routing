/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/kendo/kendo.all.d.ts"/>

module ddcloud.sbr.services {
	/**
	 * Well-known actions for a Kendo data source transport.
	 */
	export enum DataSourceTransportActions {
		/**
		 * No actions are supported by the data source.
		 */
		None	= 0,

		/**
		 * Can create new items in the data source ("POST").
		 */
		Create	= 1,
		
		/**
		 * Can read from the data source ("GET").
		 */
		Read	= 2,

		/**
		 * Can update items in the data source ("PUT").
		 */
		Update	= 4,

		/**
		 * Can delete items in the data source ("DELETE").
		 */
		Delete	= 5
	}

	/**
	 * Represents a service for creating transport configurations for Kendo data sources.
	 * @see kendo.data.DataSource
	 */
	export interface IDataSourceTransportService {
		/**
		 * Create a Kendo data source transport configuration for a simple (read-only) web API.
		 * @param url The URL for the API to call.
		 * @param realm An optional realm for which access tokens must be requested in order to call the API.
		 * @returns kendo.data.DataSourceTransport The transport configuration, as a kendo.data.DataSourceTransport.
		 * @example var dataSource = new kendo.data.DataSource( { transport: dataSourceTransportService.createTransportForSimpleReadApi("api/v1/organizations") } );
		 */
		createTransportForSimpleReadApi(url: string, realm?: string): kendo.data.DataSourceTransport;
	}
}
