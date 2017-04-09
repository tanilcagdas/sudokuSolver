 app.service('SudokuService', function($http) {


 	this.parse = function() {
 		var req = {
 			method : 'GET',
 			url : "http://localhost:8080/SudokuSolver/ParserServlet",
 			headers : headers
 		}
 		return $http(req);

 	};

 	this.solveSudoku = function(sudoku) {
	var startTime = new Date().getTime();
	var sudokuSolution ;
	/*= new Sudoku();*/

	RED = "red";
	BLUE = "blue";
	sudokuSolution = sudoku.copy();
	sudokuSolution.sudokuHasChanged = true;
	this.sudoku = sudokuSolution;
	try {
		evaluateGuesses(sudokuSolution);
	} catch (e) {
		console.error("Error Ocured", e);
	}

	try {
		countHowManyCellsLeft(sudokuSolution);
	} catch ( e) {
		console.error(e);
	}
		//  Solve the f.cking sudoku

		//  Check if the sudoku has changed
		trial = 1;
		while (sudokuSolution.sudokuHasChanged) {
			while (sudokuSolution.sudokuHasChanged) {
				while (sudokuSolution.sudokuHasChanged) {
					if(sudokuSolution.howManyCellsLeft != 0)
					solveSudokuByAlgorithm1(sudokuSolution);
				}
				if(sudokuSolution.howManyCellsLeft != 0)
				solveSudokuByAlgorithm2(sudokuSolution);
			}
			if(sudokuSolution.howManyCellsLeft != 0 && trial < 300)
			solveSudokuByAlgorithm3(sudokuSolution);
		}
		if (!sudokuSolution.solved) {
			try {
				//TODO NotSolvedWriter.log(sudoku, sudokuSolution);
			} catch (e) {
				console.error( "Error Ocured", e);
			}
		}
		var endTime = new Date().getTime();
		console.log('time :'+ (endTime -startTime) );
		return sudokuSolution;
	}

	// function countHowManyCellsLeft(sudoku){

	// 	sudoku.howManyCellsLeft = 0 ;

	// 	methodRange(sudoku, "countHowManyCellsLeftForCell", ALL);
	// 	console.log(sudoku.howManyCellsLeft + " Cells is waiting to be solved");

	// }

	// function countHowManyCellsLeftForCell( cell)  {
	// 	if (cell.getValue() == undefined || cell.getValue() == null || cell.getValue() === 0){
	// 		sudoku.howManyCellsLeft = sudoku.howManyCellsLeft + 1;
	// 	}


	// }

	 this.solveSudokuStepByStep = function(sudokuSolution, algorithm) {
		try {
			evaluateGuesses(sudokuSolution);
		} catch ( e) {
			console.error( "Error Ocured", e);
		}

		//  Check if the sudoku has changed
		trial = 1;

		//  reflection
		var methodName = "solveSudokuByAlgorithm" + algorithm;
		try {


			// this[methodName]( sudokuSolution);
			if(algorithm == 1){
				solveSudokuByAlgorithm1(sudokuSolution);
			}else if(algorithm == 2){
				solveSudokuByAlgorithm2(sudokuSolution);
			}


		} catch (e) {
			console.error("Error Ocured", e);
		} 
		return sudokuSolution;
	}





	 this.loadDemoSudoku = function( demoSudoku) {
		//  set all zeros
		var row;
		for ( row = 0; row < demoSudoku.getRowArray().length; row++) {
			var column;
			for ( column = 0; column < demoSudoku.getRowArray()[row]
				.getGroup().length; column++)
				var cell = demoSudoku.getRowArray()[row].getGroup()[column];
			cell.setValue(0);
		}
		//  put known values
		
		loadSudoku1(demoSudoku);

		return demoSudoku;

	}



 });