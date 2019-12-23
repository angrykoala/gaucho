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
            confirmButtonColor: confirmButtonColor
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
            confirmButtonColor: dangerButtonColor,
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

class SchedulerAlert extends InputAlert {
    constructor(title, options = {}) {
        super(title, "", Object.assign({
            confirmButtonText: 'Schedule',
            input: 'number',
            inputPlaceholder: 'Seconds'
        }, options));
    }
}

module.exports = {
    AppAlert: AppAlert,
    DeleteConfirmationAlert: DeleteConfirmationAlert,
    InputAlert: InputAlert,
    SchedulerAlert: SchedulerAlert,
    init: init,
    isVisible: swal.isVisible
};
