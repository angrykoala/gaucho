<template>
    <div class="field">
        <label class="label" @click="toggleCollapse">
            <template v-if="collapsable">
                <span v-show="show" class="icon">
                    <i class="fas fa-caret-down"></i>
                </span>
                <span v-show="!show" class="icon">
                    <i class="fas fa-caret-right"></i>
                </span>
            </template>
            {{title}}
        </label>
        <div v-show="show">
            <slot></slot>
        </div>
    </div>
</template>


<script>
"use strict";

const collapsableMixin = require('../../mixins/collapsable');

module.exports = {
    mixins: [collapsableMixin],
    props: ["title"]
};
</script>
