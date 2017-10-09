"use strict";

//Methods interface with jQuery
/* jshint ignore:start */
module.exports = {
    toggleModal(title, type, children = {}) {
        return swal(Object.assign({}, {
            title,
            type
        }, children));
    }
};

/* jshint ignore:end */
