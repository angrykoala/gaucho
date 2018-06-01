<template>
    <div class="tabs is-fullwidth is-light">
        <ul>
            <li v-for="(suite, index) in suites" :class="{'is-active': isSelected(index), 'inactive': !isSelected(index)}" @click="selectSuite(index)">
                <a>
                    <span class="icon tab-icon" v-if="editMode && isSelected(index)" @click="renameSuite(index)">
                        <i class="fas fa-pencil-alt" title="Rename"/>
                    </span>
                    {{suite.title}}<span v-if="editMode && isSelected(index)" class="delete is-small" @click.stop="removeSuite(index)"/>
                </a>
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

const InputAlert = require('../api/app_alerts').InputAlert;

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
        },
        renameSuite(index) {
            const alert = new InputAlert("Rename Suite?", this.suites[index].title);
            alert.toggle().then((res) => {
                if(res.length > 0) {
                    this.$store.commit("renameSuite", {
                        suite: index,
                        title: res
                    });
                }
            }).catch(() => {});
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
.tab-icon{
    color: #a0a0a0;
    &:hover{
        color: #717171;
    }
}
.delete{
    margin-left:5px;
}
</style>
