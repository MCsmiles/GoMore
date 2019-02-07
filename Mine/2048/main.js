var cellSpace = 100;
var gridSpace = 15;
var board = new Array();
var score = 0

$(document).ready(function() {
    new_game();
})

//新游戏
function new_game() {
    function init() {
        for (var i = 0; i < 4; i++) {
            board[i] = new Array();
            for (var j = 0; j < 4; j++) {
                var gridCell = $('#grid_' + i + j);
                gridCell.css('left', get_pos_left(i, j) + 'px');
                gridCell.css('top', get_pos_top(i, j) + 'px');
                board[i][j] = 0;
            };
        };
        update();
    }
    init();
    generate_one_number();
    generate_one_number();
}

//创建数字
function generate_one_number() {
    if (nospace()) {
        return false;
    }
    var rand_num = Math.random() < 0.5 ? 2 : 4;
    var randx = Math.floor(Math.random() * 4);
    var randy = Math.floor(Math.random() * 4);
    while (board[randx][randy] != 0) {
        randx = Math.floor(Math.random() * 4);
        randy = Math.floor(Math.random() * 4);
    }
    board[randx][randy] = rand_num;
    show_number_with_animation(randx, randy, rand_num);
}



//更新版面情况
function update() {
    $('.numberCell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid_container').append('<div class="numberCell" id="numberCell_' + i + j + '"></div>');
            var numCell = $('#numberCell_' + i + j)
            if (board[i][j] != 0) {
                numCell.text(board[i][j]);
                numCell.css({
                    'background': get_number_background_color(board[i][j]),
                    'color': get_number_color(board[i][j]),
                    'left': get_pos_left(i, j),
                    'top': get_pos_top(i, j),
                });
            } else {
                numCell.css('width', '0px');
                numCell.css('height', '0px');
                numCell.css('top', get_pos_top(i, j) + 50);
                numCell.css('left', get_pos_left(i, j) + 50);
            };
        };
    } //遍历一遍数组，插入新块；如果不是0，展示数字；如果是0，则展示空
}
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (move_left()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('isGameOver()', 300);
            };
            break;
        case 38: //up
            if (move_up()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('isGameOver()', 300);
            };
            break;
        case 39: //right
            if (move_right()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('isGameOver()', 300);
            };
            break;
        case 40: //down
            if (move_down()) {
                setTimeout('generate_one_number()', 210);
                setTimeout('isGameOver()', 300);
            };
            break;
    };
})

function move_left() {
    if (can_move_left() == false) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0) {
                        show_move_animation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        show_move_animation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        update_score();
                        break;
                    };
                };
            };
        };
    };
    setTimeout('update()', 200);
    return true;
}; //当一个数不为0时，向左看，如果左边有一样的数字，就加起来，如果左边有0，就把他放到0的位置

function move_right() {
    if (can_move_right() == false) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0) {
                        show_move_animation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        show_move_animation(i, j, i, k);
                        board[i][k] += board[i][j]
                        board[i][j] = 0;
                        update_score();
                        break;
                    }
                }
            }
        }
    }
    setTimeout('update()', 200);
    return true;
};

function move_down() {
    if (can_move_down() == false) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0) {
                        show_move_animation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        show_move_animation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        update_score();
                        break;
                    };
                };
            };
        };
    };
    setTimeout('update()', 200);
    return true;
};

function update_score() {
    score += 4;
    $("#score").html(score);
}

function move_up() {
    if (can_move_up() == false) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0) {
                        show_move_animation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
                        show_move_animation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        update_score();
                        break;
                    };
                };
            };
        };
    };
    setTimeout('update()', 200);
    return true;
};




//游戏失败
function isGameOver() {
    if (nomove() && nospace()) {
        gameOver()
    }

}

function nomove() {
    if (!can_move_up() && !can_move_down() && !can_move_left() && !can_move_right()) {
        return true;
    }
}

function gameOver() {
    // show();
    // setTimeout('hide()', 200);
    alert('游戏结束')
}

function nospace() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            };
        };
    };
    return true;
} //没有空间(每一个块都有数字)