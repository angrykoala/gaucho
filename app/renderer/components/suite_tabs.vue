<template>
    <div class="tabs is-fullwidth is-light">
        <ul>
            <li v-for="(suite, index) in suites" :class="{'is-active': isSelected(index), 'inactive': !isSelected(index)}" @click="selectSuite(index)">
                <a>{{suite.title}}<span v-if="editMode && isSelected(index)" class="delete is-small" @click.stop="removeSuite(index)"/></a>

            </li>
            <li v-if="canAddSuite" class="inactive" @click="addNewSuite">
                <a>
                    <span class="icon">
                        <a class="fas fa-plus"/>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>


<script>
"use strict";

module.exports = {
    computed: {
        suites() {
            return this.$store.getters.suites;
        },
        canAddSuite() {
            return this.editMode && this.$store.getters.canAddSuite;
        },
        editMode() {
            return this.$store.state.editMode;
        }
    },
    methods: {
        isSelected(i) {
            return this.$store.state.tasks.selectedSuite === i;
        },
        selectSuite(index) {
            this.$store.commit("toggleActiveSuite", index);
        },
        addNewSuite() {
            this.$store.commit("addSuite");
            this.$store.commit("toggleActiveSuite", this.suites.length - 1);
        },
        removeSuite() {
            this.$store.dispatch("deleteSuite");
        }
    }
};

</script>


<style lang="scss" scoped>
@import "../../styles/variables";

.tabs{
    background-color: $navbar-background-color;
    .inactive{
        background-color: rgba(0, 0, 0, 0.1);
    }
}

.delete{
    margin-left:5px;
}
</style>
