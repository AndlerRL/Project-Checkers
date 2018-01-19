$(document).ready(function() {
	createBoard();
    
    var playerTurn;    var positionX;	var clickNum;	var turn = "red";

    var red_points = 0; var dark_points = 0;	var actual_sq= 0;

	var global_x = 0;   var global_y = 0;	var actual_square= 0;
	var squares= [];	var piece= {};	var square= "";	var color = "";	

	var valid_movements = [1,3,5,7,10,12,14,16,17,19,21,23,26,28,30,32,
                          33,35,37,39,42,44,46,48,49,51,53,55,58,60,62,64];

    var id= valid_movements;

	v_board = new Array(7);

	for(var b=0; b <= 7; b++) {
		v_board[b] = new Array(7);
	}

	var counter = 1;

	for(var x = 0; x <= 7; x++){
		for(var y = 0; y <= 7; y++){
			v_board[x][y] = counter++;
		}
	}

	$(".black_p").click(function() {
		console.log("Haz seleccionado una Dama Oscura!");
	});
	
	$(".red_p").click(function() {
		console.log("Haz seleccionado una Dama Roja!");
	});

    function createBoard() {
    	var color= "black"; var free_square= false;

    	let $rows= [];
        for(let q = 0; q < 8; q++){
            let $row= $("<div>").addClass('row');
            if (q % 2 === 1) {
                for (let k = 0; k < 8; k++) {
                let $square= $("<div>").addClass('square');
                if (k % 2 === 1) {
                $($square).addClass('blk_sq pieceOff');
                    }
                $row.append($square);
            }
        } else {
            for (let g = 0; g < 8; g++) {
                let $square = $("<div>").addClass('square');
                if (g % 2 === 0) {
                    $($square).addClass('blk_sq pieceOff');
                }
                $row.append($square);
            }
        }
        $rows.push($row);
    }
	    $('#board').append($rows);
	    placePieces();
	}    

    function placePieces() {
        var $Rows= $(".row");
        for (var i = 0; i < $Rows.length; i++) {
            if (i < 3) {
                var img= $('<img>');
                img.attr('src', 'data/images/blackPiece.png');
                img.attr('class', 'black_p Piece');
                var $Rchild= $($Rows[i]).children('.blk_sq');
                $($Rchild).removeClass('pieceOff');
                $($Rchild).append(img);
            }else if (i > 4) {
                var img= $('<img>');
                img.attr('src', 'data/images/redPiece.png');
                img.attr('class', 'red_p Piece');
                var $Rchild= $($Rows[i]).children('.blk_sq');
                $($Rchild).removeClass('pieceOff');
                $($Rchild).append(img);
            }
        }
        player_turn= true;
    }

    ////////////////////////////////////////////
    //////////  MOVIMIENTO DE FICHAS  //////////
    ////////////////////////////////////////////

    $(".blk_sq").droppable({
    	drop: function(event, ui) {
			if (clickNum && playerTurn) {
				let $sqPos = $('.square')
				let sqPosition = $('.square').index($(this))
				let $positionDif = sqPosition - positionX;

				console.log($positionDif);

				if ($positionDif % 9 === 0 && $positionDif > 0) {
					if($positionDif / 9 > 1) {
				  		let indexCheck = positionX + 9;

				    	if($($sqPos[indexCheck]).has('.black_p').length > 0) {
						    let pieceMove = $(ui.draggable).detach();

						    $($sqPos[sqPosition]).append(pieceMove);
						    $(ui.draggable).parent()
						    			   .removeClass('pieceOff');
						    $(ui.draggable).removeClass('selected');
						    $('.workCell').addClass('pieceOff')
						                  .removeClass("workCell");

						    let $midBlk = $($sqPos[indexCheck]).children(":first-child");
						    $midBlk.addClass('remove');
						    let captureBlk = $('.remove').fadeOut('slow');

						    console.log(captureBlk);

						    clickNum = false;	playerTurn = false;
					    }
					} else {
					    let pieceMove = $(ui.draggable).detach();
					    $($sqPos[sqPosition]).append(pieceMove);
					    $(ui.draggable).parent().removeClass('pieceOff')
					    $(ui.draggable).removeClass('selected');
					    $('.workCell').addClass('pieceOff')
					                  .removeClass("workCell");

				    	clickNum = false;	playerTurn = false;
				    }
				} else if ($positionDif % 7 === 0 && $positionDif > 0) {
					if ($positionDif / 7 > 1){
						let indexCheck = positionX + 7;

				    	if ($sqPos[indexCheck].has('.black_p').length > 0) {
						    let pieceMove = $(ui.draggable).detach();
						    $($sqPos[sqPosition]).append(pieceMove);
						    $(ui.draggable).parent().removeClass('pieceOff')
						    $(ui.draggable).removeClass('selected');
						    $('.workCell').addClass('pieceOff')
						                  .removeClass("workCell");
						    let $midBlk = $($sqPos[indexCheck]).children(":first-child");
						    $midBlk.addClass('remove');
						    let captureBlk = $('.remove').fadeOut('slow');

				    		clickedNum = false;	playerTurn = false;
				    	}
					} else {
				        let pieceMove = $(ui.draggable).detach();
				        $($sqPos[sqPosition]).append(pieceMove);
				        $(ui.draggable).parent().removeClass('pieceOff')
				        $(ui.draggable).removeClass('selected');
				        $('.workCell').addClass('pieceOff')
				                      .removeClass("workCell");

				        clickNum = false;	playerTurn = false;
				    }

				}
			let blk_pLeft = $('.black_p');
		
			if (blk_pLeft.length = 0) {
				alert("Red Player Wins!");
			}
		}

		if (clickNum) {
			let $sqPos = $('.square');
			let sqPosition = $('.square').index($(this));
			let $positionDif = Math.abs(sqPosition - positionX);

			console.log($positionDif);

			if ($positionDif % 9 === 0 && $positionDif > 0) {
				if ($positionDif / 9 > 1) {
					let indexCheck = positionX - 9;

				    if($($sqPos[indexCheck]).has('.red_p').length > 0) {
					    let pieceMove = $(ui.draggable).detach();

					    $($sqPos[sqPosition]).append(pieceMove);
					    $(ui.draggable).parent()
					      			   .removeClass('pieceOff');
					    $(ui.draggable).removeClass('selected');
					    $('.workCell').addClass('pieceOff')
					                  .removeClass("workCell");
					    let $midRed = $($sqPos[indexCheck]).children(":first-child");
					    $midRed.addClass('remove');
					    let capturedRed = $('.remove').fadeOut('slow');

					    clickNum = false;	playerTurn = true;
				    }
				}else{
				    let pieceMove = $(ui.draggable).detach();
				    $($sqPos[sqPosition]).append(pieceMove);
				    $(ui.draggable).parent().removeClass('pieceOff')
				    $('.workCell').addClass('pieceOff')
				                  .removeClass("workCell");

				    clickNum = false;	playerTurn = true;
				}
			} else if ($positionDif % 7 === 0 && $positionDif > 0) {
				if ($positionDif / 7 > 1) {
			  		let indexCheck = positionX - 7;

			    	if($sqPos[indexCheck].has('.red_p').length > 0) {
					    let pieceMove = $(ui.draggable).detach();

					    $($sqPos[sqPosition]).append(pieceMove);
					    $(ui.draggable).parent().removeClass('pieceOff')
					    $(ui.draggable).removeClass('selected');
					    $('.workCell').addClass('pieceOff')
					                  .removeClass("workCell");

					    let $midRed = $($sqPos[indexCheck]).children(":first-child");
					    $midRed.addClass('remove');
					    let capturedRed = $('.remove').fadeOut('slow');

					    clickedNum = false;	playerTurn = true;
			    	}
			  	}else{
			        let pieceMove = $(ui.draggable).detach();
			        $($sqPos[sqPosition]).append(pieceMove);
			        $(ui.draggable).parent().removeClass('pieceOff')
			        $(ui.draggable).removeClass('selected');
			        $('.workCell').addClass('pieceOff')
			                      .removeClass("workCell");
			        clickNum = false;	playerTurn = true;
			    }
			}
			let red_pLeft = $('.red_p');
			if (red_pLeft.length = 0) {
				alert("Dark Player Wins!")
			}
		}
	}
    });

    $(".black_p").draggable({
        grid: [50, 50], accept: ".blk_sq",  distance: 10, refreshPositions: true,
        start: function(element,ui) {
            actual_square = ui.helper.data("square");
            piece = ui;
        },
        revert : function(ui) {
            if(ui[0]=== undefined){
            	console.log("[Drop Warning] el jugador debe usar cuadros oscuros");
                return true;
            }
            if(turn == "black") {
            	console.log("[Drop Warning] turno de jugador equivocado");
                return true;
            } else {
                turn = "black";
                $("#player_turn").fadeToggle('slow', function() {
                	$("#player_turn").show()
                					 .html("Damas Rojas");
                });
                return false;
            }

            return play_check(ui[0].id, piece);
        }
    });

    $(".red_p").draggable({
        grid: [50, 50], accept: ".blk_sq", distance: 10, refreshPositions: true,
        start: function(element,ui) {
            actual_square = ui.helper.data("square");
            piece = ui;
        },
        revert: function(ui){
            if(ui[0]=== undefined) {
            	console.log("[Drop Warning] el jugador debe usar cuadros oscuros");
                return true;
            }
            if(turn == "red") {
                console.log("[Drop Warning] turno de jugador equivocado");
                return true;
            } else {
                turn = "red";
                $("#player_turn").fadeToggle('slow', function() {
                	$("#player_turn").show()
                					 .html("Damas Oscuras");
                });
                return false;
            }
            return play_check(ui[0].id, piece);
        }
    });

    /////////////////////////////////////////
    ///////  FUNCIONES DE TABLERO  //////////
    /////////////////////////////////////////

	function free_square(id,ui) {
    ocupied_square(id,ui);
    unocupied_square();
    actual_square = 0;
	}

	function save_color() {
	    for(var i=0; i < squares.length; i++) {
	        if(squares[i].id == parseInt(actual_square)) {
	            color = squares[i].piece_color;
	        }
	    }
	}

	function unocupied_square() {
	    save_color();
	    for(var i=0; i < squares.length; i++) {
	        if(squares[i].id == parseInt(actual_square)) {
	            squares[i].status = "free";
	            squares[i].piece_color = "";
	            return true;
	        }
	    }
	    return false;
	}

	function unocupied_eaten_square(pos) {
	    for(var i=0; i < squares.length; i++) {
	        if(squares[i].id == parseInt(pos)) {
	            squares[i].status = "free";
	            squares[i].piece_color = "";
	            return true;
	        }
	    }
	    return false;
	}

	function ocupied_square(id,ui) {
	    var color = "";
	    for(var i=0; i < squares.length; i++) {
	        if(squares[i].id == parseInt(actual_square)){
	            color = squares[i].piece_color;
	        }
	    }

	    for(var i=0; i < squares.length; i++) {
	        if(squares[i].id == parseInt(id)) {
	            ui.helper.data("square",id);
	            squares[i].status = "ocupied";
	            squares[i].piece_color = color;
	            return true;
	        }
	    }
	    return false;
	}

	function play_check(square,ui) {
	    if(jQuery.inArray( parseInt(square), valid_movements) != -1) {
	        if(know_free_square(square)) {
	            if(verify_quantity_fields(square)) {
	                ready_square(square,ui);
	                return false;
	            } else {
	                return true;
	            }
	        } else {
	            return true;
	        }
	    }
	    return true;
	}


	function verify_quantity_fields(destiny) {
	    var actual_x;   var actual_y;
	    var x_destiny;  var y_destiny;
	    var d = true;   var actual_d = true;    var out = false;

	    var how_travel = 0;
	    while(how_travel < 2) {
	        for(var x = 0; x <= 7; x++) {
	            for(var y = 0; y <= 7; y++) {
	                if(how_travel == 0 && v_board[y][x] == actual_square)
	                {
	                    if(actual_d) {
	                        actual_x = x;   actual_y = y;   actual_d = false;
	                    }
	                    break;
	                }

	                if(how_travel == 1 && v_board[y][x] == destiny) {
	                    if(d) {
	                        x_destiny = x;  y_destiny = y;
	                        destiny = false;    out = true;
	                    }
	                    break;
	                }
	            }

	            if(out) {
	                break;
	            }
	        }
	        how_travel ++;
	    }

	    var verify_x = 0; var verify_y = 0;

	    if(actual_x > x_destiny) {
	        verify_x  = actual_x - x_destiny;
	    } else {
	        verify_x = x_destiny - actual_x;
	    }

	    if(actual_y > y_destiny) {
	        verify_y = actual_y - y_destiny;
	    } else {
	        verify_y = y_destiny - actual_y;
	    }

	    if((parseInt(verify_y) === 1 && parseInt(verify_x) === 1) || (parseInt(verify_y) === 2 && parseInt(verify_x) === 2)) {
	        if(parseInt(verify_y) === 2 && parseInt(verify_x) === 2) {

	            var ocupied_x_square =  0;  var ocupied_y_square  = 0;

	            if(actual_x > x_destiny) {
	                ocupied_x_square  = actual_x - 1;
	            } else {
	                ocupied_x_square = actual_x + 1;
	            }

	            if(actual_y < y_destiny)
	            {
	                ocupied_y_square = actual_y + 1;
	            } else {
	                ocupied_y_square = actual_y - 1;
	            }

	            console.log(v_board[ocupied_x_square][ocupied_y_square]);

	            for(var i=0; i < squares.length; i++)
	            {
	                if(square[i].id == v_board[ocupied_x_square][ocupied_y_square]){

	                    console.log(piece); console.log(square[i]);

	                    if(squares[i].status == "ocupied") {

	                        for(var p=0; p < squares.length; p++) {

	                            if(squares[p].id == v_board[actual_x][actual_y]) {

	                                if(squares[i].piece_color == squares[p].piece_color) {

	                                    return false;
	                                } else {
	                                   console.log(piece);

	                                    $("div[name*='piece']").each(function() {

	                                        if($(this).data("square") == squares[i].id) {
	                                            $(this).hide('fade', 750);

	                                            if(squares[i].piece_color == "red") {

	                                               dark_points ++;
	                                               $("#dark_score").html(dark_points);
	                                            } else {

	                                                red_points ++;
	                                                $("#red_score").html(red_points);
	                                            }
	                                        }
	                                    });

	                                    squares[i].status = "free";  squares[i].piece_color = "";
	                                }
	                            }
	                        }
	                    } else {
	                        return false;
	                    }
	                }
	            }
	        }
	        return true;
	    } else {
	        return false;
	    }
	}

	function know_free_square(id) {
	    for(var i=0; i < squares.length; i++) {
	        if(squares[i].id == parseInt(id) && squares[i].status == "free") {
	            return true;
	        }
	    }
	    return false;
	}
});