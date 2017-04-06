var DEFAULT_GUESSES = [];
{
	if (DEFAULT_GUESSES.length == 0) {
		var i;
		for ( i = 1; i < 10; i++)
			DEFAULT_GUESSES.push(i);

	}
}



var headers =  {
	"Access-Control-Allow-Origin": "*",
	'Access-Control-Allow-Credentials': true
};


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

 app.service('SudokuService', function($http) {



 	this.parse = function() {
 		var req = {
 			method : 'GET',
 			url : "http://localhost:8080/SudokuSolver/ParserServlet",
 			headers : headers
 		}
 		return $http(req);

 	};
 });

 app.controller('sudokuCtrl',  ['$scope','SudokuService', function($scope, SudokuService)  {
 	console.log("Sudoku Controller");

 	$scope.sudoku;


 	function init() {
 		$scope.sudoku = new Sudoku() ;
 		<!--printSudoku($scope.sudoku);-->
 	};

 	$scope.loadDemo = function(){
 		$scope.sudoku  = loadDemoSudoku($scope.sudoku )
 	};

 	$scope.loadFromJava = function(){
 		$scope.sudoku  = parseFromJava($scope.sudoku )
 	};

 	res = SudokuService.parse();
 	res.then(function(response) {
 		var finalData = response.data;
 		//$scope.sudoku.rowArray = finalData;

 		for (i = 0; i < finalData.length; i++) { 

 			sudokuGroup = $scope.sudoku.rowArray[i].group;
 			restGroup = finalData[i].group;
 			for (j = 0; j < sudokuGroup.length; j++) { 
 				sudokuGroup[j].value = restGroup[j].value;
 			}

 			//text += cars[i] + "<br>";
 		}

 	}, function errorCallback(response) {
 		console.log(response.status + " : " + response.statusText);
 	});


 	$scope.solve = function(){
 		$scope.sudoku  = solveSudoku($scope.sudoku )
 	};

 	$scope.clear = function(){
 		init();
 	};

 	init();
 	console.log($scope.sudoku);

 }]);


