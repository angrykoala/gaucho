<template>
    <div class="switch">
        <label>
            {{title}}
            <input v-model="inputValue" type="checkbox" @change="updateValue()">
            <span class="lever switch-lever"/>
        </label>
    </div>
</template>

<script>
"use strict";

module.exports = {
    props: ['title', 'value'],
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {
        updateValue() {
            this.$emit('input', this.inputValue);
        }
    },
    watch: {
        value(newVal) {
            this.inputValue = newVal;
        }
    }
};
</script>


<style lang="scss" scoped>
.switch-lever {
    float: right;
}

.switch > label {
    font-size: 15px;
}
</style>
