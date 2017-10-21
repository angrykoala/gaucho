/* globals swal */
"use strict";


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

const confirmationTitle = "Are you sure?";

class DeleteConfirmationAlert extends AppAlert {
    constructor(text, options = {}) {
        super(confirmationTitle, Object.assign({
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
