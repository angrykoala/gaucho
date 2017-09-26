"use strict";

module.exports = {
    props: ['title', 'value'],
    template: `
    <div class="switch">
      <label>
        {{title}}
        <input type="checkbox" v-model="value" v-on:change="updateValue()">
        <span class="lever switch-lever"></span>
      </label>
    </div>
    `,
    methods: {
        updateValue() {
            this.$emit('input', this.value);
        }
    }
};
