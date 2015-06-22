Sudoku = function(amount, hide_amount, show){
	this.columns  = amount?amount:this.columns;
	this.hiddens = hide_amount? hide_amount:this.hiddens;
	this.setup();
}

Sudoku.prototype={
	columns : 9,
	hiddens : 27,
	show_result : true,
	sudoku_solved : new Object,
	sudoku : new Object,
	setup: function(){
		gridable = (Math.sqrt(this.columns)%1==0?true:false);
		this.sudoku.row = new Array(this.columns);//rows
		this.sudoku.column = new Array(this.columns);//this.columns
		this.sudoku.grid = new Array(this.columns);//grid
		for (var a = 0; a<this.columns; a++){
			this.sudoku.row[a] = new Array(this.columns);//rows:column
			this.sudoku.column[a] = new Array(this.columns);//this.columns:row
			this.sudoku.grid[a] = new Array(this.columns);//grid:index(row*3+column)
		}
		var counter = 0;
		for(var i = 0; i< this.columns; i++){//row
			var list = [];
			for (var c = 1; c <= this.columns; c++) {
			    list.push(c);
			}
			for (var k = 0;k<this.columns; k++){//column
    				var x = Math.floor((Math.random() * list.length));
				var tried = [];
    				if(gridable){
					while(this.sudoku.row[i].indexOf(list[x])>-1||
						this.sudoku.column[k].indexOf(list[x])>-1||
						this.sudoku.grid[Math.floor(k/3)+3*(Math.floor(i/3))].indexOf(list[x])>-1){						
						
						tried.push(x);
    						if(tried.length==list.length){
    							break;
    						}   						
	    					while(tried.indexOf(x)!=-1){
								x = Math.floor((Math.random() * list.length));
						}
					}
					if(tried.length==list.length){
						x= 0;
						while(this.swap(i,k,list[x])===false){
							x++;
							if(x==tried.length){
								this.setup();
								return;
							}
						}
					}else{
						this.add_at(i,k,list[x]);
					}
					list.splice(x,1);
				}else{

					while(this.sudoku.row[i].indexOf(list[x])>-1||
						this.sudoku.column[k].indexOf(list[x])>-1){						
						
						tried.push(x);
    						if(tried.length==list.length){
    							break;
    						}   						
	    					while(tried.indexOf(x)!=-1){
								x = Math.floor((Math.random() * list.length));
						}
					}
					if(tried.length==list.length){
						x= 0;
						while(this.swap(i,k,list[x])===false){
							x++;
							if(x==tried.length){
								this.setup();
								return;
							}
						}
					}else{
						this.add_at(i,k,list[x]);
					}
					list.splice(x,1);
				}
				counter = 0;
			}
		}
		this.sudoku_solved = JSON.parse(JSON.stringify(this.sudoku));
		//set up sudoku
		for (var a= 0; a<this.hiddens; a++){
			var x = Math.floor((Math.random() * this.columns)), y = Math.floor((Math.random() * this.columns));
			while(this.value_at(x,y)===null){
				x = Math.floor((Math.random() * this.columns));
				 y = Math.floor((Math.random() * this.columns));
			}
			this.add_at(x,y,null);
		}
	},
	swap: function (row, column, value){
		for(var i = 0; i<column; i++){
			if(gridable){
				if(this.sudoku.column[i].indexOf(value)===-1&&this.sudoku.grid[Math.floor(i/3)+3*(Math.floor(row/3))].indexOf(value)===-1
					&&this.sudoku.column[column].indexOf(this.sudoku.column[i][row])===-1
					&&this.sudoku.grid[Math.floor(column/3)+3*(Math.floor(row/3))].indexOf(this.sudoku.column[i][row])===-1){
					var x = this.sudoku.column[i][row];
				this.add_at(row,i,value);
				this.add_at(row,column,x);
				return true;
				}
			}else{
				if(this.sudoku.column[i].indexOf(value)===-1&&this.sudoku.column[column].indexOf(this.sudoku.column[i][row])===-1){
					var x = this.sudoku.column[i][row];
				this.add_at(row,i,value);
				this.add_at(row,column,x);
				return true;
				}
			}
		}
		return false;
	},
	add_at:function (x, y, value){
		this.sudoku.row[x][y] = value;
		this.sudoku.column[y][x] = value;
		if(gridable){
			this.sudoku.grid[Math.floor(y/3)+3*(Math.floor(x/3))][y%3+3*(x%3)] = value;
		}
	},	
	value_at:function (x, y){
		return this.sudoku.row[x][y];
	},
	get_sudoku:function(type){
		if(type === 'row'){
			return JSON.stringify(this.sudoku.row);
		}
		if(type === 'grid'&&gridable){
			return JSON.stringify(this.sudoku.grid);
		}
		if(type === 'columns'){
			return JSON.stringify(this.sudoku.column);
		}
		else{
			return JSON.stringify(this.sudoku);
		}
	},
	get_sudoku_complete:function(type){
		if(type === 'row'){
			return JSON.stringify(this.sudoku_solved.row);
		}
		if(type === 'grid'&&gridable){
			return JSON.stringify(this.sudoku_solved.grid);
		}
		if(type === 'columns'){
			return JSON.stringify(this.sudoku_solved.column);
		}
		else{
			return JSON.stringify(this.sudoku_solved);
		}
	}
}

//ie fix
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(needle) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === needle) {
                return i;
            }
        }
        return -1;
    };
}
