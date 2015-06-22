# Sudoku-Generator
Creates Sudoku board with 6 or more numbers per line in seconds (along with solution)

Checkout ```index.html``` for a sample on how to use, __requires__ jQuery!

API will be updated soon!

##How to Use
To use, simply initiate a new ```var sudoku = new Sudoku(a, b)``` where a is the dimention of a grid (for standard and by default it is 9) and b is how many hidden(27 on default or 3/9 fields).

then use ```javascript sudoku.get_sudoku();``` to get a json object containing it
you can also specify in the parameter if you want it in 'row', 'column', or 'grid';
the same will go for ```javascript sudoku.get_sudoku_complete();``` 

complete sample code:
```javascript
var sudoku = new Sudoku();

console.log(sudoku.get_sudoku());//actual puzzle
console.log(sudoku.get_sudoku_complete());//solution
```

other functions:
```javascript
var sudoku = new Sudoku();

sudoku.value_at(x,y);
sudoku.add_at(x,y,value);
sudoku.setup();//resets the whole sudoku puzzle
```
