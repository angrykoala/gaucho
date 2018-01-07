<template>
    <div>
        <div class="navbar-fixed">
            <nav class="nav-extended">
                <div class="nav-wrapper">
                    <div class="brand-logo main-logo left">
                        <img class="logo-icon" src="resources/logos/gaucho_logo.png"></img>
                        <a>Gaucho</a>
                    </div>
                    <tap-target :activates="'tap-edit'" :title="'Add some tasks !'" :description="'By pressing this button you can add new tasks to your list below.'"/>
                    <ul class="right navbar-buttons">
                        <li><a id="tap-edit" @click="toggleEdit" :class="{'edit-button-active': editMode}" class="edit-button"><i class="material-icons unselectable-text">mode_edit</i></a></li>
                        <li><a id="navbar-menu-button" data-activates="navbar-menu" data-gutter="30" :href="'#tab0'"><i class="material-icons small unselectable-text">menu</i></a></li>
                    </ul>
                    <navbar-menu @selection="onMenuSelection"/>

                    <div class="row tabs-row">
                        <ul id="navbar-tabs" class="tabs tabs-transparent">
                            <template v-for="(suite,index) in suites">
                                <li class="tab col s3 unselectable-text" @dragover="dragOver(index)">
                                    <a draggable="false" class="tab-button" @click="onTabSelected(index)" :href="'#tab'+index" :class="{ active: index===0 }">
                                        <template v-if="editMode && index===activeSuite">
                                            <input id="suite-title-input" type="text" class="validate tab-text" v-model="suite.title">
                                        </template>
                                        <span class="tab-text" v-show="!editMode || index!==activeSuite">{{suite.title}}</span>
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>
"use strict";

const Material = require('../api/materialize');
const AppStatus = require('../app_status');
const NavbarMenu = require('./navbar_menu.vue');
const TapTarget = require('./tap_target.vue');
const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;

module.exports = {
    components: {
        "navbar-menu": NavbarMenu,
        "tap-target": TapTarget
    },
    mounted() {
        Material.checkFirstTimeTap(".tap-target");
    },
    methods: {
        dragOver(index) {
            this.selectTab(index);
        },
        addSuite() {
            if (this.$store.getters.canAddSuite) {
                this.$store.commit("addSuite");
                this.selectTab(this.suites.length - 1);
            }
        },
        deleteSuite() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover this suite after deletion!");
            confirmationAlert.toggle().then(() => {
                if (this.suites.length > 1) {
                    this.suites[this.activeSuite].stopAll();
                    this.suites.splice(this.activeSuite, 1);
                    this.selectTab(this.activeSuite);
                }
            }, () => {});
        },
        onTabSelected(index) {
            this.$store.commit("toggleActiveSuite", index);
        },
        selectTab(index) {
            if (index >= this.suites.length) index = this.suites.length - 1;
            // this.$nextTick(() => {
            setTimeout(() => {
                Material.selectTab("#navbar-tabs", `tab${index}`);
                this.$store.commit("toggleActiveSuite", index);
            }, 0);
            // });
        },
        toggleEdit() {
            this.$store.commit("toggleEdit");
        },
        onMenuSelection(selection) {
            switch (selection) {
                case "add-suite":
                    this.addSuite();
                    break;
                case "delete-suite":
                    this.deleteSuite();
                    break;
                default:
                    AppStatus.events.emit(selection);
            }
        }
    },
    computed: {
        currentSuite() {
            return this.suites[this.activeSuite];
        },
        activeSuite() {
            return this.$store.state.activeSuite;
        },
        editMode() {
            return this.$store.state.editMode;
        },
        suites() {
            return this.$store.getters.suites;
        }
    }
};
</script>

<style lang="scss" scoped>
#navbar-tabs {
    overflow: hidden;
}

.edit-button {
    cursor: default;
}

.edit-button-active {
    transition: color 0.5s ease;
    background-color: rgba(0, 0, 0, 0.3);
    color: #989898;
    &:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
}

.tabs-row {
    margin-bottom: 0;
}

.tab-button {
    cursor: default;
}

.tab-text {
    font-weight: 500;
    text-align: center;
    text-transform: none;
}
.brand-logo {
    &.main-logo {
        user-select: none;
        margin-top: 5px;
        cursor: default;
        & a {
            vertical-align: top;
        }
    }
}

.logo-icon {
    height: 40px;
}

.nav-extended {
    line-height: 56px !important;
}

.navbar-buttons i {
    height: 56px !important;
    line-height: 56px !important;
}
</style>
