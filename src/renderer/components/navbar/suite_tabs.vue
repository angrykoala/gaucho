<template>
    <div class="tabs is-fullwidth">
        <!-- <draggable v-model="suites" tag="ul" v-bind="draggableOptions" @end="suiteDragEnd"> -->
            <li v-for="(suite, index) in suites" class="tab-suite-item" :style="{ width: tabsWidth }" :class="{'is-active': isSelected(index), 'inactive': !isSelected(index)}" @click="selectSuite(index)" @contextmenu.stop="context(index)"
                @dragover="selectSuite(index)" :key="index"
            >
                <a class="columns is-mobile is-centered tab-content">
                    <div class="column tab-text-container">
                        <span class="level-item tab-text">{{suite.title}}</span>
                    </div>
                    <div class="column is-narrow" v-if="editMode && isSelected(index)">
                        <span class="icon tab-icon level-item" @click="removeSuite(index)">
                            <i class="fas fa-times" title="Delete"></i>
                        </span>
                    </div>
                </a>
            </li>
            <li v-if="canAddSuite" class="inactive" :style="{ width: tabsWidth }" @click="addNewSuite">
                <a class="add-suite-tab">
                    <span class="icon">
                        <a class="fas fa-plus"></a>
                    </span>
                </a>
            </li>
        <!-- </draggable> -->
    </div>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';

// const os = require('os');
// const path = require('path');
// const dialog = require('@electron/remote').dialog;
//
// const AppAlerts = require('../../api/app_alerts');
// const ContextMenu = require('../../api/context_menu');
// const schedulerModal = require('../../api/scheduler_modal');
//
// const constants = require('../../../common/constants.js');

import Draggable from "vue3-draggable";

const components = {
    "draggable": Draggable
};

export default defineComponent({
    components: components,
    computed: {
        suites: {
            get() {
                return [{title: "test suite"}];
                // return this.$store.getters.suites;
            },
            set(value) {
                // this.$store.commit('updateSuites', value);
            }
        },
        canAddSuite() {
            return true;
            // return this.editMode && this.$store.getters.canAddSuite;
        },
        editMode() {
            return true
            // return this.$store.state.editMode;
        },
        tabsWidth() {
            let tabs = this.suites.length;
            if (this.editMode && tabs < 6) tabs++;
            return `${100 / tabs}px`;
        },
        draggableOptions() {
            return {
                filter: ".tab-icon",
                draggable: ".tab-suite-item",
                disabled: !this.editMode,
                group: "suites"
            };
        }
    },
    methods: {
        context(index) {
            // const tabMenu = new ContextMenu.TabMenu(this.suites[index].title);
            //
            // tabMenu.on("run-suite", (i) => {
            //     this.selectSuite(i);
            //     this.$store.dispatch("runSuite");
            // });
            // tabMenu.on("stop-suite", (i) => {
            //     this.selectSuite(i);
            //     this.$store.dispatch("stopSuite", i);
            // });
            // tabMenu.on("schedule-suite", (i) => {
            //     this.selectSuite(i);
            //     const title = this.suites[i].title;
            //     schedulerModal(`Schedule "${title}" Execution`).then((res) => {
            //         this.$store.dispatch("scheduleSuite", res);
            //     }, () => {
            //         // Cancelled scheduling
            //     });
            // });
            //
            // tabMenu.on("delete", (i) => {
            //     this.removeSuite(i);
            // });
            // tabMenu.on("rename", (i) => {
            //     this.renameSuite(i);
            // });
            // tabMenu.on("export-suite", (i) => {
            //     this.exportSuite(i);
            // });
            // tabMenu.on("duplicate-suite", (i) => {
            //     this.duplicateSuite(i);
            // });
            // tabMenu.toggle(index);
        },
        isSelected(i) {
            return false;
            // return this.$store.state.tasks.selectedSuite === i;
        },
        selectSuite(index) {
            // this.$store.commit("toggleActiveSuite", index);
        },
        addNewSuite() {
            // this.$store.commit("addSuite");
            // this.$store.commit("toggleActiveSuite", this.suites.length - 1);
        },
        removeSuite(index) {
            // const title = this.suites[index].title;
            // const alert = new AppAlerts.DeleteConfirmationAlert(`This will remove suite ${title} and all its tasks.`);
            // alert.toggle().then(() => {
            //     this.$store.dispatch("deleteSuite", index);
            // }).catch(() => {
            //     // In case delete is cancelled
            // });
        },
        renameSuite(index) {
            // const alert = new AppAlerts.InputAlert("Rename Suite?", this.suites[index].title, {
            //     inputAttributes: {
            //         maxLength: constants.maxSuiteNameLength
            //     }
            // });
            //
            // alert.toggle().then((res) => {
            //     if (res.length > 0) {
            //         this.$store.commit("renameSuite", {
            //             suite: index,
            //             title: res
            //         });
            //     }
            // }).catch(() => {
            //     // Rename is cancelled
            // });
        },
        exportSuite(index) {
            // const suite = this.suites[index];
            // dialog.showSaveDialog({
            //     defaultPath: path.join(os.homedir(), `${suite.title}.json`),
            //     filters: [{
            //         extensions: ['json']
            //     }]
            // }).then((dialogResult) => {
            //     if (dialogResult.filePath) {
            //         this.$store.dispatch("exportSuite", {
            //             filename: dialogResult.filePath,
            //             suiteIndex: index
            //         }).catch((err) => {
            //             console.warn(err);
            //         });
            //     }
            // });
        },
        duplicateSuite(index) {
            // this.$store.dispatch("duplicateSuite", index);
        },
        suiteDragEnd(evt) {
            // this.selectSuite(evt.newIndex);
        }
    }
});
</script>


<style lang="scss" scoped>
@use "../../styles/variables";

.tabs {
    .inactive {
        background-color: rgba(0, 0, 0, 0.1);
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
    .tab-icon {
        margin-left: 0;
        margin-right: 0;
    }
    .columns {
        margin-left: 0;
        margin-right: 0;
    }

    ul {
        border-bottom-style: hidden;
    }
}

.tab-content {
    .column {
        padding-left: 0;
        padding-right: 0;
    }
}
.tab-text-container {
    overflow: hidden;
    .tab-text {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
}
</style>
