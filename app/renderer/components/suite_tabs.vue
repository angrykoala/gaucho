<template>
    <div class="tabs is-fullwidth">
        <ul>
            <li v-for="(suite, index) in suites" :class="{'is-active': isSelected(index), 'inactive': !isSelected(index)}" @click="selectSuite(index)" @dragover="selectSuite(index)">
                <a>
                    <span class="icon tab-icon" :class="{transparent: !isSelected(index)}" v-if="editMode" @click="renameSuite(index)">
                        <i class="fas fa-pencil-alt" title="Rename"/>
                    </span>
                    {{suite.title}}
                    <span class="icon tab-icon" :class="{transparent:!isSelected(index)}" v-if="editMode" @click.stop="removeSuite(index)">
                        <i class="fas fa-times-circle" title="Delete"/>
                    </span>
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

const AppAlerts = require('../api/app_alerts');

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
        removeSuite(index) {
            if(this.isSelected(index)) {
                const title = this.suites[index].title;
                const alert = new AppAlerts.DeleteConfirmationAlert(`This will remove suite ${title} and all its tasks.`);
                alert.toggle().then(() => {
                    this.$store.dispatch("deleteSuite");
                }).catch(() => {});
            }
        },
        renameSuite(index) {
            if(this.isSelected(index)) {
                const alert = new AppAlerts.InputAlert("Rename Suite?", this.suites[index].title);
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
    }
};

</script>


<style lang="scss" scoped>
@import "../../styles/variables";

.tabs{
    .inactive{
        background-color: rgba(0, 0, 0, 0.1);
    }
}
.tab-icon{
    &.transparent {
        color: transparent !important;
        background-color: transparent !important;
    }

}
.delete{
    margin-left:5px;
}
</style>
