"use strict";

module.exports = {
    props: ['title', 'min', 'max', 'value'],
    template: `
    <div>
        <label>{{title}}</label>
        <p class="range-field">
            <input type="range" v-bind:min="min" v-bind:max="max" v-model="value" v-on:change="updateValue()">
        </p>
    </div>
    `,
    methods: {
        updateValue() {
            this.$emit('input', this.value);
        }
    }
};
