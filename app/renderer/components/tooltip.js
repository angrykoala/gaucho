"use strict";

module.exports = {
    props: ['color'],
    template: `
    <div class="tooltip">
        <div class="tooltip-text">
            {{ status }}
        </div>
    </div>
    `,
    computed: {
        status() {
            switch (this.color) {
                case "black":
                    return "Idle";
                case "red":
                    return "Error";
                case "blue":
                    return "Running";
                case "green":
                    return "OK";
                case "grey":
                default:
                    return "N/A";
            }
        }
    }
};
