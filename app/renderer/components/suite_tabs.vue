<template>
    <div class="tabs is-fullwidth is-light">
        <ul>
            <li v-for="(suite, index) in suites" :class="{'is-active': isSelected(index)}" @click="selectSuite(index)"><a>{{suite.title}}</a></li>
        </ul>
    </div>
</template>


<script>
"use strict";

module.exports = {
    computed: {
        suites() {
            return this.$store.getters.suites;
        }
    },
    methods: {
        isSelected(i) {
            return this.$store.state.tasks.selectedSuite === i;
        },
        selectSuite(index) {
            this.$store.commit("toggleActiveSuite", index);
        }
    }
};

</script>


<style lang="scss" scoped>
@import "../../styles/variables";

.tabs{
    background-color: $navbar-color;
}
</style>
