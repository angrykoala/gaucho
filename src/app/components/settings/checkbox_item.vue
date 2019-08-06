<template>
<div class="level is-mobile">
    <div class="level-left">
        <p class="level-item">{{label}}</p>
    </div>
    <div class="level-right">
        <switch-input class="level-item" :value="value" @input="valueChange"></switch-input>
    </div>
</div>
</template>


<script>
"use strict";

const components = {
    "switch-input": require('../common/switch_input.vue')
};
const InputMixin = require('../../mixins/input_mixin')

module.exports = {
    props: ["label"],
    mixins: [InputMixin],
    components: components
};
</script>
