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
            <div class="field is-horizontal env-variables-container">
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="Key">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="Value">
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
    data() {
        return {
            open: false
        };
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
