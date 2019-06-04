<template>
    <div class="field">
        <input type="checkbox" name="switchExample" class="switch is-rounded" :checked="value? 'checked':''">
        <label @click="onClick"/>
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
