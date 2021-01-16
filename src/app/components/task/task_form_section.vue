<template>
    <div class="field">
        <label class="label" @click="show=!show">
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

module.exports = {
    props: ["title", "collapsable"],
    data() {
        return {
            show: !this.collapsable
        };
    }
};
</script>
