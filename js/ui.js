"use strict";


/**
 * configs
 *
 */
// layout for 8-puzzle
var layout_8puzzle = [
    [0, 1, 2],
    [7, -1, 3],
    [6, 5, 4]
];

// layout for 5-puzzle
var layout_5puzzle = [
    [-1, 0, -1],
    [4, -1, 1],
    [3, -1, 2]
];


/**
 * global variables
 */
var current_base = undefined;


/**
 * append the grid layout to the dom
 *
 * @param {Object} dom
 * @param {Array<Array<Number>>} grid_layout
 * @param {Dictionary} appearance_config
 */
function create_layout(dom, grid_layout, appearance_config) {
    // clear current layout
    dom.empty();

    // create layout
    grid_layout.forEach((row_layout) => {
        var row_dom = $('<div class="row"></div>')
            .appendTo(dom);

        row_layout.forEach((item_name) => {
            var block_dom = $('<div class="col"></div>')
                .appendTo(row_dom);
            if (item_name < 0) {
                return;
            }

            var item_dom = $('<button type="button"></button>')
                .appendTo(block_dom)
                .attr('id', appearance_config['id_prefix'] + '-' + item_name)
                .attr('data-toggle', appearance_config['toggle'])
                .addClass('btn btn-lg')
                .addClass(appearance_config['style_class'])
                .text(appearance_config['text'])
                .click(appearance_config['click_event']);
        });
    })
}


/**
 *  bridge the ui and the solver
 *
 */
function solve_puzzle() {
    // get flags
    var problem_status = 0;
    for (var i=0; i<8; i++) {
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
    for (var i=0; i<8; i++) {
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
 * @param {*} e
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
    setTimeout(solve_puzzle, 50);
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
 * setup page layouts
 */
$('#type-8puzzle').change((e) => {
    current_base = 8;
    initial_layout(layout_8puzzle);
}).click();

$('#type-5puzzle').change((e) => {
    current_base = 5;
    initial_layout(layout_5puzzle);
});
