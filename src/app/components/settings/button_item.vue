<template>
    <div class="field">
        <div class="control has-text-centered">
            <button class="button is-primary is-fullwidth" @click="onClick"><slot/></button>
            <small class="settings-label" v-if="label">{{label}}</small>
        </div>
    </div>
</template>


<script>
"use strict";

module.exports = {
    props: ["label"],
    methods: {
        onClick() {
            this.$emit("select");
        }
    }
};

</script>

<style lang="scss" scoped>

.settings-label{
        font-size: 0.84rem;
        color: #929292;
}

</style>
