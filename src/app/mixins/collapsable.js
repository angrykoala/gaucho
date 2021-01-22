"use strict";

module.exports = {
    props: {
        collapsable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: !this.collapsable
        };
    },
    methods: {
        toggleCollapse() {
            if (this.collapsable) {
                this.show = !this.show;
            }
        }
    }
};
