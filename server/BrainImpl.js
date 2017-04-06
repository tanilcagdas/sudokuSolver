



var RED = "red";
var BLUE = "blue";
var ROW = "row";
var ALL = "all";
var COLUMN = "column";
var THREExTHREE = "3x3";
var DEFAULT_GUESSES;
var trial;
var sudokuCorrect = true;
var sudoku;

function defaultGuesses(){
	var arr= [];
	var i ;
	for ( i = 1; i < 10; i++)
		arr.push(i);
	return arr;
}

function solveSudoku( sudoku) {
	var startTime = new Date().getTime();
	var sudokuSolution ;
	/*= new Sudoku();*/
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

	function solveSudokuStepByStep( sudokuSolution, algorithm) {
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

			this[methodName](this,  sudokuSolution);

		} catch (e) {
			console.error("Error Ocured", e);
		} 
		return sudokuSolution;
	}



	function solveSudokuByAlgorithm2( sudokuSolution) {
		if (sudokuSolution.howManyCellsLeft != 0)
			try {
				determineWhoHasUniqueGuessInGroup(sudokuSolution);
			} 
			catch (e) {

				//if(e.getCause() instanceof SudokuException){
					console.error(e);
					return sudokuSolution;
				//}else {
				//	console.log(Level.SEVERE, "Error Ocured", e);
				//}

			}
		// 
		if (sudokuSolution.getHowManyCellsLeft() == 0) {
			sudokuSolution.setSolved(true);
			sudokuSolution.setSudokuHasChanged(false);
			console.log("Sudoku is solved");
			return sudokuSolution;
		}
		return sudokuSolution;
	}

	function loadDemoSudoku( demoSudoku) {
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

	function methodRange( sudoku,  methodName,  range){
		var method;
		if (range === ALL ) {
			var row;
			for ( row = 0; row < 9; row++) {
				var columnIndex;
				for ( columnIndex = 0; columnIndex < 9; columnIndex++) {
					var cell = sudoku.rowArray[row].group[columnIndex];

					this[methodName](  cell);
				}
			}
		} else {

			var group = null;
			var i;
			for ( i = 0; i < 9; i++) {
				if (range === ROW) {
					group = sudoku.getRowArray()[i];
				} else if (range === COLUMN ) {
					group = sudoku.getColumnArray()[i];
				} else if (range === "3x3") {
					group = sudoku.getThreeByThreeArray()[i];
				}
				this[methodName](  group);
			}
		}
	}

	function  evaluateGuessesForCell( cell) {
		if (cell.getValue() == undefined || cell.getValue() == null || cell.getValue() === 0 || cell.getValue() == "") {
			cell.setGuesses( defaultGuesses());
		} else {
			cell.setFound(true);
			console.log(cell.getValue() + ", " + cell.isFound());
			console.log(cell.getColumn().sudoku.howManyCellsLeft);
		}

	}





	function countHowManyCellsLeft(sudoku){

		sudoku.howManyCellsLeft = 0 ;

		methodRange(sudoku, "countHowManyCellsLeftForCell", ALL);
		console.log(sudoku.howManyCellsLeft + " Cells is waiting to be solved");

	}

	function countHowManyCellsLeftForCell( cell)  {
		if (cell.getValue() == undefined || cell.getValue() == null || cell.getValue() === 0){
			sudoku.howManyCellsLeft = sudoku.howManyCellsLeft + 1;
		}


	}


	function  markAsUniqueGuessAndDetermine( number,  group) {
		var i;
		for ( i = 0; i < 9; i++) {
			var cell = group.getGroup()[i];
			if (cell.getGuesses() != null) {
				for (let guess of cell.getGuesses()) {
					if (guess == number) {
						// TODO check others
						var j;
						for ( j = 0; j < 9; j++) {
							if (i == j)
								continue;
							var compareCell = group.getGroup()[j];
							if (compareCell.getGuesses() != null) {
								for (let compareGuess of compareCell.getGuesses()) {
									if (compareGuess == number) {
										return;
									}
								}
							};
						}
						cell.setValue(number);
						cell.setColor(BLUE);
						group.sudoku.setSudokuHasChanged(true);
						group.sudoku.howManyCellsLeft = group.sudoku.howManyCellsLeft - 1;
						break;
					};
				}
			};
		}
	};

	function  evaluateGuesses( sudoku) {
		methodRange(sudoku, "evaluateGuessesForCell", ALL);
	}

	

	function  determineCellsWhoHas1Guess( sudokuSolution) {
		methodRange(sudokuSolution, "determineCellsWhoHas1GuessForCell", ALL);
		console.log(sudokuSolution.getHowManyCellsLeft()
			+ " Cells is waiting to be solved");
	}


	function determineWhoHasUniqueGuessInGroup( sudokuSolution) {
		methodRange(sudokuSolution, "determineWhoHasUniqueGuessInGroupForGroup", ROW);
		methodRange(sudokuSolution, "determineWhoHasUniqueGuessInGroupForGroup",
			COLUMN);
		methodRange(sudokuSolution, "determineWhoHasUniqueGuessInGroupForGroup", "3x3");

	}

	

	/*function  isSudokuCorrect(Sudoku sudoku) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException{
		setSudokuCorrect(true);
		methodRange(sudoku, "isSudokuCorrect",ROW);
		if(isSudokuCorrect())
		methodRange(sudoku, "isSudokuCorrect",COLUMN);
		if(isSudokuCorrect())
		methodRange(sudoku, "isSudokuCorrect",THREExTHREE);
		return isSudokuCorrect();
	}*/

	function isSudokuCorrect( group) {
		var i;
		for ( i = 0; i < 9; i++) {
			var uniqueValue = group.getGroup().get(i).getValue();
			if(uniqueValue == 0){
				continue;
			}
			var j;
			for ( j = 0; j < 9; j++) {
				if(i==j)
					continue;
				var compareValue = group.getGroup().get(j).getValue();
				if(compareValue == uniqueValue){
					setSudokuCorrect(false);

				}
			}
			
		}
	}

	/**
	 * @return the sudokuCorrect
	 */
	 function  isSudokuCorrect() {
	 	return sudokuCorrect;
	 }

	/**
	 * @param sudokuCorrect the sudokuCorrect to set
	 */
	 function  setSudokuCorrect( sudokuCorrect) {
	 	this.sudokuCorrect = sudokuCorrect;
	 }


