"use strict";

const Suite = require('../suite');
const Material = require('../materialize');
const AppStatus = require('../app_status');

const NavbarMenu = require('./navbar_menu');
const WindowFrameTop = require('./window_frame_top');

module.exports = {
    props: ['suites'],
    components: {
        "navbar-menu": NavbarMenu,
        "window-frame-top": WindowFrameTop
    },
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    template: `
    <div>
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-wrapper">
                <window-frame-top></window-frame-top>
                <div class="brand-logo main-logo left">
                <img class="logo-icon" src="resources/logos/gaucho_logo.png"></img>
                <a>Gaucho</a>
                </div>
                <ul class="right">
                    <li><a v-on:click="toggleEdit" v-bind:class="{'edit-button-active': editMode}" class="edit-button"><i class="material-icons unselectable-text">mode_edit</i></a></li>
                    <li><a class="navbar-menu-button" href='#' data-activates='navbar-menu'><i class="material-icons small unselectable-text">menu</i></a></li>
                </ul>
                <navbar-menu v-on:selection="onMenuSelection" v-bind:suites="suites"></navbar-menu>
            
                <div class="row tabs-row">
                    <ul id="navbar-tabs" class="tabs tabs-transparent">
                        <template v-for="(suite,index) in suites">
                        <li class="tab col s3 unselectable-text">
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
    methods: {
        addSuite() {
            if (this.suites.length < AppStatus.maxSuites) {
                this.suites.push(new Suite("Suite " + (this.suites.length + 1)));
                this.selectTab(this.suites.length - 1);
            }
        },
        deleteSuite() {
            if (this.suites.length > 1) {
                this.suites[AppStatus.activeSuite].stopAll();
                this.suites.splice(AppStatus.activeSuite, 1);
                this.selectTab(AppStatus.activeSuite);
            }
        },
        onTabSelected(index) {
            AppStatus.activeSuite = index;
        },
        selectTab(index) {
            if (index >= this.suites.length) index = this.suites.length - 1;
            this.$nextTick(() => {
                Material.selectTab("#navbar-tabs", 'tab' + index);
                AppStatus.activeSuite = index;
            });
        },
        toggleEdit() {
            AppStatus.toggleEdit();
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
                    this.AppStatus.events.emit(selection);
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
