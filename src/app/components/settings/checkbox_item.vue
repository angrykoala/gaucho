<template>
    <div class="level is-mobile">
        <div class="level-left">
            <p class="level-item">{{label}}</p>
        </div>
        <div class="level-right">
            <switch-input class="level-item" :value="value" @input="valueChange"/>
        </div>
    </div>
</template>


<script>
"use strict";

const components = {
    "switch-input": require('../common/switch_input.vue')
};

module.exports = {
    props: ["label", "value"],
    components: components,
    methods: {
        valueChange(newVal) {
            this.$emit("input", newVal);
        }
    }
};


</script>
