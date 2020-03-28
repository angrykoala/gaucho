"use strict";

const swal = require('sweetalert2');

let store;

const confirmButtonColor = "#2bbbad";
const dangerButtonColor = "#f14668";

function init(newStore) {
    store = newStore;
}

function getTheme() {
    return `theme-${store.state.userConfig.theme}`;
}

class AppAlert {
    constructor(title, options = {}) {
        this.alertOptions = Object.assign({
            title: title,
            customClass: getTheme(),
            heightAuto: false,
            confirmButtonColor: confirmButtonColor,
            showClass: {
                popup: ''
            },
            hideClass: {
                popup: ''
            }
        }, options);
    }

    html(html) {
        this.alertOptions.html = html;
        return this;
    }

    toggle() {
        const p = swal.fire(this.alertOptions);
        return p;
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
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            confirmButtonColor: dangerButtonColor
        }, options));
    }
}

class ImportTaskAlert extends DeleteConfirmationAlert {
    constructor(text, options = {}) {
        super("Importing tasks will remove all current tasks.", Object.assign({
            text: text,
            showCancelButton: true,
            confirmButtonText: "Yes, import tasks",
            cancelButtonText: "No, cancel import",
            confirmButtonColor: confirmButtonColor
        }, options));
    }
}

class InputAlert extends InteractiveAlert {
    constructor(title, defaultValue = "", options = {}) {
        super(title, Object.assign({
            showCancelButton: true,
            confirmButtonText: 'Rename',
            input: 'text',
            inputValue: defaultValue
        }, options));
    }
}

module.exports = {
    AppAlert,
    DeleteConfirmationAlert,
    InputAlert,
    ImportTaskAlert,
    init: init,
    isVisible: swal.isVisible
};
