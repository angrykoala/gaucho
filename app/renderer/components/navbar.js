"use strict";

const Suite = require('../../common/suite');
const Material = require('../api/materialize');
const AppStatus = require('../app_status');
const GauchoActions = require('../api/gaucho_actions');
const NavbarMenu = require('./navbar_menu');
const TapTarget = require('./tap_target');
const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;

module.exports = {
    props: ['suites'],
    components: {
        "navbar-menu": NavbarMenu,
        "tap-target": TapTarget
    },
    template: `
    <div>
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-wrapper">
                <div class="brand-logo main-logo left">
                    <img class="logo-icon" src="resources/logos/gaucho_logo.png"></img>
                    <a>Gaucho</a>
                </div>
                <tap-target v-bind:activates="'tap-edit'" v-bind:title="'Add some tasks !'" v-bind:description="'By pressing this button you can add new tasks to your list below.'"></tap-target>
                <ul class="right navbar-buttons">
                    <li><a id="tap-edit" v-on:click="toggleEdit" v-bind:class="{'edit-button-active': editMode}" class="edit-button"><i class="material-icons unselectable-text">mode_edit</i></a></li>
                    <li><a id="navbar-menu-button" data-activates='navbar-menu' data-gutter="30"><i class="material-icons small unselectable-text">menu</i></a></li>
                </ul>
                <navbar-menu v-on:selection="onMenuSelection" v-bind:suites="suites"></navbar-menu>

                <div class="row tabs-row">
                    <ul id="navbar-tabs" class="tabs tabs-transparent">
                        <template v-for="(suite,index) in suites">
                        <li class="tab col s3 unselectable-text" v-on:dragover="dragOver(index)">
                            <a draggable="false" class="tab-button" v-on:click="onTabSelected(index)" v-bind:href="'#tab'+index" v-bind:class="{ active: index===0 }">
                                <template v-if="editMode && index===AppStatus.activeSuite">
                                    <input id="suite-title-input" type="text" class="validate tab-text" v-model="suite.title">
                                </template>
                                <span class="tab-text" v-show="!editMode || index!==AppStatus.activeSuite">{{suite.title}}</span>
                            </a>
                        </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    </div>
    `,
    mounted() {
        Material.checkFirstTimeTap(".tap-target");
    },
    methods: {
        dragOver(index) {
            this.selectTab(index);
        },
        addSuite() {
            if (this.suites.length < AppStatus.maxSuites) {
                this.suites.push(new Suite(`Suite ${(this.suites.length + 1)}`));
                this.selectTab(this.suites.length - 1);
            }
        },
        deleteSuite() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover this suite after deletion!");
            confirmationAlert.toggle().then(() => {
                if (this.suites.length > 1) {
                    this.suites[AppStatus.activeSuite].stopAll();
                    AppStatus.totalTasks -= this.suites[AppStatus.activeSuite].length;
                    this.suites.splice(AppStatus.activeSuite, 1);
                    this.selectTab(AppStatus.activeSuite);
                }
            }, () => {});
        },
        onTabSelected(index) {
            AppStatus.activeSuite = index;
        },
        selectTab(index) {
            if (index >= this.suites.length) index = this.suites.length - 1;
            this.$nextTick(() => {
                Material.selectTab("#navbar-tabs", `tab${index}`);
                AppStatus.activeSuite = index;
            });
        },
        toggleEdit() {
            GauchoActions.toggleEdit();
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
            return this.suites[AppStatus.activeSuite];
        },
        editMode() {
            return AppStatus.editMode;
        }
    }
};
