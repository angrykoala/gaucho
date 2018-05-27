"use strict";

const swal = require('sweetalert2');

class AppAlert {
    constructor(title, options = {}) {
        this.alertOptions = Object.assign({
            title: title
        }, options);
    }

    html(html) {
        this.alertOptions.html = html;
        return this;
    }

    toggle() {
        return swal(this.alertOptions).then((result) => {
            if (result.value) return Promise.resolve();
            else return Promise.reject();
        });
    }
}

class DeleteConfirmationAlert extends AppAlert {
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

module.exports = {
    AppAlert: AppAlert,
    DeleteConfirmationAlert: DeleteConfirmationAlert
};
