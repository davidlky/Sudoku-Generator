# Sudoku-Generator
Creates Sudoku board with 6 or more numbers per line in seconds (along with solution)

API will be updated too

To use, simply initiate a new var sudoku = new Sudoku(a, b) where a is the dimention of a grid (for standard and by default it is 9) and b is how many hidden(27 on default or 3/9 fields).

then use ```sudoku.get_sudoku();``` to get a json object containing it
you can also specify in the parameter if you want it in 'row', 'column', or 'grid';
the same will go for sudoku.get_sudoku_complete(); 

complete sample code:
var sudoku = new Sudoku();

console.log(sudoku.get_sudoku());//actual puzzle
console.log(sudoku.get_sudoku_complete());//solution

other functions:
value_at(x,y);
add_at(x,y,value);
setup();//resets the whole sudoku puzzle
