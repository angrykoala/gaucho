<template>
    <div class="field">
        <input type="checkbox" class="switch is-rounded" :checked="value? 'checked':''">
        <label class="switch-label" @click="onClick"></label>
    </div>
</template>

<script>
"use strict";

module.exports = {
    props: ["value"],
    methods: {
        onClick() {
            this.$emit("input", !this.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.switch-label {
    margin-bottom: 20px;
}
</style>
