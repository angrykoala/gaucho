<template>
    <div>
        <h3 class="settings-subtitle" @click="show=!show">
            <template v-if="collapsable">
                <span v-show="show" class="icon">
                    <i class="fas fa-caret-down"></i>
                </span>
                <span v-show="!show" class="icon">
                    <i class="fas fa-caret-right"></i>
                </span>
            </template>
            {{title}}
        </h3>
        <div class="settings-menu-section" v-show="show">
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


<style lang="scss" scoped>
.settings-menu-section {
    padding: 10px 20px;
}

.settings-subtitle {
    font-size: 15px;
    color: #9e9e9e;
    margin-top: 25px;
}
</style>
