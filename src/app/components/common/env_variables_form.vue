<template>
    <div class="control env-list">
        <div class="field is-horizontal env-variable-container" v-for="(env, i) of value" :key="i">
            <div class="field-body">
                <div class="field">
                    <p class="control is-expanded">
                        <input class="input" :class="{'is-danger': isDuplicate(env[0])}" type="text" placeholder="Key" v-model="env[0]">
                    </p>
                </div>
                <div class="field">
                    <p class="control is-expanded">
                        <input class="input" type="text" placeholder="Value" v-model="env[1]">
                    </p>
                </div>
                <div class="field close-field">
                    <p class="control is-expanded">
                        <span class="icon" @click="deleteVariable(i)" :class="{'hidden-icon': i>=value.length-1}">
                            <i class="fas fa-times"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";

module.exports = {
    props: ["value"],
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
        isDuplicate(key) {
            return this.value.filter(v => v[0] === key).length >= 2;
        },
        deleteVariable(index) {
            const newVar = this.value.filter((v, i) => i !== index);
            this.$emit("input", newVar);
        }
    }
};
</script>

<style lang="scss" scoped>
.env-list {
    max-height: 152px;
    overflow: auto;

    .env-variable-container {
        padding-left: 16px;
        padding-right: 16px;
    }

    .close-field {
        align-self: center;

        .hidden-icon{
            visibility: hidden;
        }
    }
}
</style>
