var DEFAULT_GUESSES = [];
		{
			if (DEFAULT_GUESSES.length == 0) {
				var i;
				for ( i = 1; i < 10; i++)
					DEFAULT_GUESSES.push(i);

			}
		}
/**
 * Main AngularJS Web Application
 */
var app = angular.module('sudokuWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "index.html", controller: "sudokuCtrl"})
    // Pages

    // Blog

    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "sudokuCtrl"});
}]);



app.controller('sudokuCtrl',  ['$scope', function($scope)  {
  console.log("Sudoku Controller");

	$scope.sudoku;

	function init() {
		$scope.sudoku = new Sudoku() ;
		<!--printSudoku($scope.sudoku);-->
	};

	$scope.loadDemo = function(){
		$scope.sudoku  = loadDemoSudoku($scope.sudoku )
	};

	$scope.solve = function(){
		$scope.sudoku  = solveSudoku($scope.sudoku )
	};

	$scope.clear = function(){
		init();
	};

	init();
	console.log($scope.sudoku);

}]);


