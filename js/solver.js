"use strict";


/**
 * convert representation of i-th item to internal flag
 *
 * @param {number} idx
 */
function idx2flag(idx, base) {
    return 1 << ((idx+base) %base);
}


/**
 * get the affected item mask
 *
 * @param {number} selected_idx
 * @param {number} base
 */
function get_impacted_mask(selected_idx, base=8) {
    var impacted_O = idx2flag(selected_idx, base);
    var impacted_L = idx2flag(selected_idx -1, base);
    var impacted_R = idx2flag(selected_idx +1, base);

    return impacted_O | impacted_L | impacted_R;
}


/**
 * get the flag that implies the puzzle is fulled
 *
 * @param {number} base
 */
function get_full_status(base) {
    var flag = 0;
    for (var attempt_idx=0; attempt_idx<base; attempt_idx++) {
        flag |= idx2flag(attempt_idx, base);
    }
    return flag;
}


/**
 * solve the 8-puzzle
 *
 * @param {number} problem_status
 * @param {number} problem_base
 * @param {number} attempt_idx
 */
function solve(problem_status, problem_base=8, attempt_idx=0) {
    if (problem_status == get_full_status(problem_base)) {
        return 0;   // solved
    } else if (attempt_idx == problem_base) {
        return -1;  // fail
    }

    var attempt_status = problem_status ^ get_impacted_mask(attempt_idx, problem_base);
    var attempt_result = solve(attempt_status, problem_base, attempt_idx+1);
    if (attempt_result >= 0) {
        return attempt_result | idx2flag(attempt_idx, problem_base);
    }

    return solve(problem_status, problem_base, attempt_idx+1);
}
