function solveSudokuByAlgorithm1( sudokuSolution) {
	sudokuSolution.sudokuHasChanged = false;
	try {
		clearGuessesInGroupOfSudoku(sudokuSolution);
	} catch (e) {
		console.error("Error Ocured", e);
	}
	try {
		determineCellsWhoHas1Guess(sudokuSolution);
	} catch (e) {
		console.error( "Error Ocured", e);
	}
	if (sudokuSolution.howManyCellsLeft  == 0) {
		sudokuSolution.setSolved(true);
		sudokuSolution.setSudokuHasChanged(false);
		console.log("Sudoku is solved");
		return sudokuSolution;
	}
	console.log("This is the trial number: " + trial);
	trial++;
	return sudokuSolution;
}

function  determineCellsWhoHas1GuessForCell( cell){
	if ((cell.getValue() == undefined || cell.getValue() == null || cell.getValue() === 0) && cell.getGuesses() != null
		&& cell.getGuesses().length === 1) {
		var value = cell.getGuesses()[0];
	cell.setValue(value);
	cell.setColor(RED);
	if (cell.getRow().sudoku.sudokuHasChanged === false) {
		cell.getRow().sudoku.sudokuHasChanged = true;
		console.log("sudoku has changed value has been found");
	}
}
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

function  clearGuessesInGroupOfSudoku( sudoku) {
	methodRange(sudoku, "clearGuessesInGroup", ROW);
	methodRange(sudoku, "clearGuessesInGroup", COLUMN);
	methodRange(sudoku, "clearGuessesInGroup", "3x3");
}

function  clearGuessesInGroup( group) {
	var foundValuesInGroup =[];
	var i;
	for ( i = 0; i < 9; i++) {
		if (group.getGroup()[i].getValue() != undefined && group.getGroup()[i].getValue() !=null && group.getGroup()[i].getValue() != 0) {
			foundValuesInGroup.push(group.getGroup()[i].getValue());
		}
	}
	var fi;
	for ( fi = 0; fi< foundValuesInGroup.length ; fi++) {
		var foundValues = foundValuesInGroup[fi];
		var groupidx;
		for ( groupidx = 0; groupidx < 9; groupidx++) {
			var gssidx;
			for ( gssidx = 0; gssidx < 9; gssidx++) {
				var Guesses = null;
				try {
					Guesses = group.getGroup()[groupidx].getGuesses();
				} catch (e) {
					console.error( "Error Ocured", e);
				}
				if (Guesses != null && Guesses.length > gssidx
					&& Guesses[gssidx] == foundValues) {
					group.getGroup()[groupidx].getGuesses()
				.splice(gssidx, 1);
				if (group.sudoku.sudokuHasChanged === false) {
					group.sudoku.sudokuHasChanged = true;
				}


			}
		}
	}

}
};