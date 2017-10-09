/* globals swal */
"use strict";

module.exports = {
    toggle(title, type, otherProps = {}) {
        return swal(Object.assign({
            title,
            type
        }, otherProps));
    }
};
