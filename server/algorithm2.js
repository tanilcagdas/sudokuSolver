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


	function determineWhoHasUniqueGuessInGroup( sudokuSolution) {
		methodRange(sudokuSolution, "determineWhoHasUniqueGuessInGroupForGroup", ROW);
		methodRange(sudokuSolution, "determineWhoHasUniqueGuessInGroupForGroup",
			COLUMN);
		methodRange(sudokuSolution, "determineWhoHasUniqueGuessInGroupForGroup", "3x3");

	}

	function  determineWhoHasUniqueGuessInGroupForGroup( group) {
	var number ;

	for ( number = 1; number < 10; number++) {
		var uniqueGuessCount = 0;
		for (let cell of  group.getGroup()) {
			if (cell.guesses != null) {
				for (let guess of cell.getGuesses()) {
					if (guess == number) {
						uniqueGuessCount++;
					}
				}
			}
		}
		if (uniqueGuessCount == 1) {
			for (let cell of group.getGroup()) {
				if(cell.value==number){
					return;
				}
			}
			
			
			markAsUniqueGuessAndDetermine(number, group);
			setSudokuCorrect(true);
			isSudokuCorrect(group);
			if(!isSudokuCorrect()){
				console.error("Sudoku is not Correct after markAsUniqueGuessAndDetermine number : " +number+", group : "+group );
			}
		};
	}
}