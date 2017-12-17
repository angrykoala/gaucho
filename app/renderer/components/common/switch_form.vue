<template>
<div class="switch">
    <label>
        {{title}}
        <input type="checkbox" v-model="inputValue" @change="updateValue()">
        <span class="lever switch-lever"></span>
      </label>
</div>
</template>

<script>
"use strict";

module.exports = {
    props: ['title', 'value'],
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {
        updateValue() {
            this.$emit('input', this.inputValue);
        }
    },
    watch: {
        value(newVal) {
            this.inputValue = newVal;
        }
    }
};
</script>
