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
                const lastVariable = this.value[this.value.length - 1];
                if (!lastVariable || lastVariable[0] || lastVariable[1]) this.value.push([]);
                this.$emit("input", this.value);
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
.env-variables-container{
    padding-left: 16px;
    padding-right: 16px;
}
</style>
