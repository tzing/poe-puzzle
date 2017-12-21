"use strict";


/**
 * global variables
 */
var current_base = undefined;


/**
 *  bridge the ui and the solver
 *
 */
 function solve_and_show() {
    // get flags
    var problem_status = 0;
    for (var i=0; i<current_base; i++) {
        var is_active = $('#status-'+i).hasClass('active');
        if (!is_active) {
            continue;
        }

        problem_status |= 1 << i;
    }

    // calc solution
    var solution = solve(problem_status, current_base);

    // clear previous answer
    $('.solution')
        .removeClass('btn-warning')
        .addClass('btn-light')
        .text('--');

    // error handle
    if (solution == -1) {
        $('#alert-no-solution').removeClass('d-none');
        return;
    }
    $('#alert-no-solution').addClass('d-none');

    // render answer
    for (var i=0; i<current_base; i++) {
        var should_active = (solution >> i) & 0x1;
        if (!should_active) {
            continue;
        }

        $('#sol-'+i)
            .text('press')
            .removeClass('btn-light')
            .addClass('btn-warning');
    }
}


/**
 * callback for initial status button clicked
 *
 */
function on_status_change(e) {
    // get item
    var item = $(e.target);

    // set apprence
    item
        .toggleClass('btn-outline-light')
        .toggleClass('btn-success')
        .text(!item.hasClass('active') ? 'full' : 'empty');

    // solve
    setTimeout(solve_and_show, 50);
}


/**
 * initial the problem panel layout
 *
 */
function initial_layout(layout) {
    // setup
    create_layout($('#grid-init'), layout, {
        'id_prefix': 'status',
        'text': 'empty',
        'style_class':'btn-outline-light',
        'toggle': 'button',
        'click_event': on_status_change
    });

    create_layout($('#grid-sol'), layout, {
        'id_prefix': 'sol',
        'text': '--',
        'style_class':'solution',
    });

    // trigger
    $('#status-0').click();
};


/**
 * setup page layouts.
 *
 */
$('#type-8puzzle').change((e) => {
    current_base = 8;
    initial_layout(layout_8puzzle);
}).click();

$('#type-5puzzle').change((e) => {
    current_base = 5;
    initial_layout(layout_5puzzle);
});

$('#link-solver')
    .attr('href', '#')
    .addClass('active');
