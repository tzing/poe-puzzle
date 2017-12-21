"use strict";


/**
 * global variables
 */
var is_trigger_nearby = undefined;
var current_base = undefined;


/**
 * toggle button
 *
 * @param {Object} item
 */
function toggle(item) {
    console.log(item.attr('id') +  item.hasClass('active'));
    item
        .toggleClass('btn-outline-light')
        .toggleClass('btn-success')
        .text(item.hasClass('btn-success') ? 'full' : 'empty');
}


/**
 * callback for initial status button clicked
 *
 */
function on_status_change(e) {
    // get item id
    var item = $(e.target);
    var id = parseInt(item.attr('id').split('-')[1]);

    // render
    if (!is_trigger_nearby) {
        toggle(item);
        return;
    }

    // get impact range
    var impact = get_impacted_mask(id, current_base);

    // set apprence
    for (var i=0; i<current_base; i++) {
        var should_active = (impact >> i) & 0x1;
        if (!should_active) {
            continue;
        }

        toggle($('#status-'+i));
    }
}


/**
 * initial the problem panel layout
 *
 */
function initial_layout(layout) {
    // setup
    create_layout($('#grid'), layout, {
        'id_prefix': 'status',
        'text': 'empty',
        'style_class':'btn-outline-light',
        'click_event': on_status_change
    });

    // trigger
    $('#status-0').click();
};


/**
 * setup page layouts.
 *
 */
$('#trigger-on').change((e) => {
    is_trigger_nearby = true;
});

$('#trigger-off').change((e) => {
    is_trigger_nearby = false;
}).click();

$('#type-8puzzle').change((e) => {
    current_base = 8;
    initial_layout(layout_8puzzle);
}).click();

$('#type-5puzzle').change((e) => {
    current_base = 5;
    initial_layout(layout_5puzzle);
});

$('#link-simulator')
    .attr('href', '#')
    .addClass('active');
