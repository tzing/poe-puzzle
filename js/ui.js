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
