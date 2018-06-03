"use strict";

const swal = require('sweetalert2');

let store;

function init(newStore) {
    store = newStore;
}

function _getTheme() {
    return `theme-${store.state.userConfig.theme}`;
}

class AppAlert {
    constructor(title, options = {}) {
        this.alertOptions = Object.assign({
            title: title,
            customClass: _getTheme(),
            heightAuto: false
        }, options);
    }

    html(html) {
        this.alertOptions.html = html;
        return this;
    }

    toggle() {
        return swal(this.alertOptions);
    }
}

class InteractiveAlert extends AppAlert {
    toggle() {
        return super.toggle().then((result) => {
            if (result.value) return Promise.resolve(result.value);
            else return Promise.reject();
        });
    }
}

class DeleteConfirmationAlert extends InteractiveAlert {
    constructor(text, options = {}) {
        super("Are you sure?", Object.assign({
            text: text,
            showCancelButton: true,
            confirmButtonColor: "#ee6e73",
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            type: 'warning'
        }, options));
    }
}

class InputAlert extends InteractiveAlert {
    constructor(title, defaultValue = "", options = {}) {
        super(title, Object.assign({
            showCancelButton: true,
            confirmButtonColor: "#ee6e73",
            confirmButtonText: 'Rename',
            input: 'text',
            inputValue: defaultValue
        }, options));
    }
}

module.exports = {
    AppAlert: AppAlert,
    DeleteConfirmationAlert: DeleteConfirmationAlert,
    InputAlert: InputAlert,
    init: init
};
