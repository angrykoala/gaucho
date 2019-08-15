"use strict";

module.exports = {
    props: ["value"],
    methods: {
        valueChange(newVal) {
            if (newVal.target && newVal.target.value) newVal = newVal.target.value;
            this.$emit("input", newVal);
        }
    }
};
