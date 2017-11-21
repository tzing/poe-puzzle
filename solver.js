function gen_mask(bit) {
    var b1 = (7 - bit) & 0x7;
    var b0 = ((b1-1) & 0x7);
    var b2 = ((b1+1) & 0x7);
    return (1<<b0) | (1<<b1) | (1<<b2);
}


function find_solution(flag, bit) {
    if (flag == 0xff) {
        return 0;   // success
    } else if (bit == 8) {
        return -1;  // fail
    }

    var test = find_solution(flag^gen_mask(bit), bit+1);
    if (test > -1) {
        return test | (1 << (7 - bit));
    }

    return find_solution(flag, bit+1);
}


function solve_puzzle() {
    // get flags
    var flag = 0;
    for (var i=0; i<8; i++) {
        var is_active = $('#init-'+i).hasClass('active');
        flag = (flag << 1) | is_active;
    }

    // calc solution
    var solution = find_solution(flag, 0);

    // error handle
    if (solution == -1) {
        $('#alert-no-solution').removeClass('d-none');
    }
    $('#alert-no-solution').addClass('d-none');

    // render answer
    for (var i=0; i<8; i++) {
        var should_active = (solution & 0x80) == 0x80;
        solution = solution << 1;

        if (!should_active) {
            continue;
        }

        $('#sol-'+i)
            .text('press')
            .removeClass('btn-light')
            .addClass('btn-warning');
    }
}


$('.init-status')
    // initial status
    .addClass('btn-outline-light')
    .text('empty')
    // click event
    .click(function(e){
        // get item
        var item = $(this);

        // set apprence
        item.toggleClass('btn-outline-light').toggleClass('btn-success');
        item.text(!item.hasClass('active') ? 'full' : 'empty');

        // solve
        $('.solution')
            .removeClass('btn-warning')
            .addClass('btn-light')
            .text('--');
        setTimeout(solve_puzzle, 100);
    })
    // trigger once
    .first()
    .click();
