<template>
    <div class="tabs is-fullwidth">
        <draggable v-model="suites" element="ul" :options="draggableOptions" @end="suiteDragEnd">
            <li v-for="(suite, index) in suites" class="tab-suite-item" @contextmenu.stop="context(index)" :style="{ width: tabsWidth }" :class="{'is-active': isSelected(index), 'inactive': !isSelected(index)}" @click="selectSuite(index)" @dragover="selectSuite(index)">
                <a class="columns is-mobile is-centered tab-content">
                    <div class="column tab-text-container">
                        <span class="level-item tab-text">{{suite.title}}</span>
                    </div>
                    <div class="column is-narrow" v-if="editMode && isSelected(index)">
                        <span class="icon tab-icon level-item" @click="removeSuite(index)">
                            <i class="fas fa-times" title="Delete"/>
                        </span>
                    </div>
                </a>
            </li>
            <li v-if="canAddSuite" class="inactive" :style="{ width: tabsWidth }" @click="addNewSuite">
                <a class="add-suite-tab">
                    <span class="icon">
                        <a class="fas fa-plus"/>
                    </span>
                </a>
            </li>
        </draggable>
    </div>
</template>


<script>
"use strict";

const AppAlerts = require('../api/app_alerts');
const ContextMenu = require('../api/context_menu');

const tabMenu = new ContextMenu.TabMenu();

const components = {
    "draggable": require('vuedraggable')
};

module.exports = {
    components: components,
    computed: {
        suites: {
            get() {
                return this.$store.getters.suites;
            },
            set(value) {
                this.$store.commit('updateSuites', value);
            }
        },
        canAddSuite() {
            return this.editMode && this.$store.getters.canAddSuite;
        },
        editMode() {
            return this.$store.state.editMode;
        },
        tabsWidth() {
            let tabs = this.suites.length;
            if(this.editMode && tabs < 6) tabs++;
            return `${100 / tabs}px`;
        },
        draggableOptions() {
            const basicOptions = {
                filter: ".tab-icon",
                draggable: ".tab-suite-item"
            };
            return Object.assign(basicOptions, {'disabled': !this.editMode});
        }
    },
    methods: {
        context(index) {
            tabMenu.on("delete", (i) => {
                this.removeSuite(i);
            });
            tabMenu.on("rename", (i) => {
                this.renameSuite(i);
            });
            tabMenu.toggle(index);
        },
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
            const title = this.suites[index].title;
            const alert = new AppAlerts.DeleteConfirmationAlert(`This will remove suite ${title} and all its tasks.`);
            alert.toggle().then(() => {
                this.$store.dispatch("deleteSuite", index);
            }).catch(() => {});
        },
        renameSuite(index) {
            const alert = new AppAlerts.InputAlert("Rename Suite?", this.suites[index].title);
            alert.toggle().then((res) => {
                if(res.length > 0) {
                    this.$store.commit("renameSuite", {
                        suite: index,
                        title: res
                    });
                }
            }).catch(() => {});
        },
        suiteDragEnd(evt) {
            this.selectSuite(evt.newIndex);
        }
    }
};

</script>


<style lang="scss" scoped>
@import "../../styles/variables";

.tabs{
    .inactive{
        background-color: rgba(0, 0, 0, 0.1);
        &:hover{
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
    .tab-icon{
        margin-left: 0;
        margin-right:0;
    }
    .columns{
        margin-left: 0;
        margin-right: 0;
    }

    ul{
        border-bottom-style: hidden;
    }
}

.tab-content{
    .column{
        padding-left: 0;
        padding-right: 0;
    }
}
.tab-text-container{
    overflow: hidden;
    .tab-text{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
}
</style>
