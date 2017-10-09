/* globals swal */
"use strict";

//Methods interface with jQuery
module.exports = {
    toggle(title, type, otherProps = {}) {
        return swal(Object.assign({
            title,
            type
        }, otherProps));
    }
};
