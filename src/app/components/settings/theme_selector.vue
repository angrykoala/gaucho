<template>
<div class="level is-mobile">
    <div class="level-left">
        <p class="level-item">Theme</p>
    </div>
    <div class="level-right">
        <div class="control">
            <div class="select">
                <select :value="value" @input="valueChange">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="classic">Classic</option>
                </select>
            </div>
        </div>
    </div>
</div>
</template>

<script>
"use strict";

const InputMixin = require('../../mixins/input_mixin');

module.exports = {
    mixins: [InputMixin]
};
</script>
