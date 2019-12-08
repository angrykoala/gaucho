<template>
    <div class="field">
        <label class="label" @click="switchOpen">
            <span v-show="open" class="icon">
                <i class="fas fa-caret-down"></i>
            </span>
            <span v-show="!open" class="icon">
                <i class="fas fa-caret-right"></i>
            </span>
            Env Variables
        </label>
        <div class="control" v-show="open">
            <div class="field is-horizontal env-variables-container" v-for="(env, i) of value" :key="i">
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="Key" v-model="env[0]">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="Value" v-model="env[1]">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
"use strict";

module.exports = {
    props: ["value"],
    data() {
        return {
            open: false
        };
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                const value = this.value.filter(a => a[0] || a[1]);
                const lastElement = value[value.length - 1];
                if (!lastElement || (lastElement[0] && lastElement[1])) value.push([]);
                if (value.length !== this.value.length) this.$emit("input", value);
            }
        }
    },
    methods: {
        switchOpen() {
            this.open = !this.open;
        }
    }
};
</script>


<style lang="scss" scoped>
.env-variables-container {
    padding-left: 16px;
    padding-right: 16px;
}
</style>
