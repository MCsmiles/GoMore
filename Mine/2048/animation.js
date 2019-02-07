function show_move_animation(fromx, fromy, tox, toy) {
    var number_cell = $('#numberCell_' + fromx + fromy);

    // alert(fromx + '' + fromy + '从高' +
    //     get_pos_top(fromx, fromy) + '左 ' + get_pos_top(fromx, fromy) + '移动到高' + get_pos_top(tox, toy) + '左' + get_pos_left(tox, toy))
    number_cell.animate({
        top: get_pos_top(tox, toy),
        left: get_pos_left(tox, toy)
    }, 200);
}

function get_pos_top(i, j) {
    return gridSpace + i * (cellSpace + gridSpace);
}

function get_pos_left(i, j) {
    return gridSpace + j * (cellSpace + gridSpace);
}

function show_number_with_animation(i, j, rand_number) {
    var number_cell = $('#numberCell_' + i + j);
    number_cell.css('background-color', get_number_background_color(rand_number));
    number_cell.css('color', get_number_color(rand_number));
    number_cell.text(rand_number);
    number_cell.animate({
        width: 100,
        height: 100,
        top: get_pos_top(i, j),
        left: get_pos_left(i, j),
    }, 100);
}

function show() {
    $("#lose").fadeIn(3000);
    $("#lose").css('display', 'none');
}

function hide() {
    $("#lose").fadeOut(3000);
    $("#lose").css('display', 'none');
}