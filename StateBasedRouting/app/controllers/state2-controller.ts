/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/kendo/kendo.all.d.ts"/>
/// <reference path="state-root-controller.ts"/>

/**
 * Scope definition for the State2 application controller.
 */
interface IState2ControllerScope
	extends IStateRootControllerScope
{
	/**
	 * A groaning to display.
	 */
	groaning: string;

	/**
	 * The data source for the grid displayed in the nested state view.
	 */
	gridDataSource: kendo.data.DataSource;

	/**
	 * Options for the Kendo grid displayed in the nested state view.
	 */
	gridOptions: kendo.ui.GridOptions;

	/**
	 * The Kendo grid displayed in the nested state view.
	 */
	grid: kendo.ui.Grid;
}

/**
 * Contract for the top-level node in state 2 data.
 */
interface IState2Data
{
	/**
	 * A simple textual status for diagnostic purposes.
	 */
	status: string;

	/**
	 * The data items.
	 */
	data: IState2DataItem[];
}

/**
 * Contract for state 2 data items.
 */
interface IState2DataItem {
	/**
	 * The first field.
	 */
	field1: string;

	/**
	 * The second field (er, whatever).
	 */
	field2: string;
}

/**
 * The State2 application controller.
 */
class State2Controller
{
	/**
	 * The controller's dependencies to be injected.
	 */
	public static $inject = [
		'$scope',
		'$http'
	];

	/**
	 * Create a new State2Controller.
	 * @param $scope The controller scope.
	 * @returns {} 
	 */
	constructor(private $scope: IState2ControllerScope, $http : ng.IHttpService) {
		console.log("State2Controller constructed.");
		
		$scope.greeting = "Hello from State 2";
		$scope.groaning = "Bah, Angular World!";

		$scope.gridDataSource = new kendo.data.DataSource(
			{
				transport: {
					read: options => {
						$http.get<IState2Data>('/data/state2-data.json')
							.success(
								result => options.success(result.data)
							)
							.error(
								result => options.error(result)
							);
					}
				}
			}
		);
		$scope.gridOptions = {
			dataSource: $scope.gridDataSource,
			columns: [
				{
					field: "field1",
					title: "Field 1"
				},
				{
					field: "field2",
					title: "Field 2"
				}
			]			
		};
	}
}

angular.module('app')
	.controller('State2Controller', State2Controller);
