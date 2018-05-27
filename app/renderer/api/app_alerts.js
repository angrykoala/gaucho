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
        return swal(this.alertOptions);
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

    toggle() {
        return super.toggle().then((result) => {
            if (result.value) return Promise.resolve();
            else return Promise.reject();
        });
    }
}

module.exports = {
    AppAlert: AppAlert,
    DeleteConfirmationAlert: DeleteConfirmationAlert
};
