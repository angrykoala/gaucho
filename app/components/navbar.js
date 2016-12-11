"use strict";

const Suite = require('../suite');
const UserConfig = require('../user_config');
const Material = require('../materialize');
const AppStatus = require('../app_status');
const NavbarMenu = require('./navbar_menu');

module.exports = {
    props: ['suites'],
    components: {
        "navbar-menu": NavbarMenu
    },
    data: () => {
        return {
            output: "",
            cleanOutput: false,
            AppStatus: AppStatus
        };
    },
    template: `
    <div>
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-wrapper">
                <a class="brand-logo main-logo left">Gaucho</a>
                <ul class="right">
                    <li><a v-on:click="toggleEdit" v-bind:class="{'edit-button-active': editMode}"><i class="material-icons">mode_edit</i></a></li>
                    <li><a class="navbar-menu-button" href='#' data-activates='navbar-menu'><i class="material-icons small">menu</i></a></li>
                </ul>
                <navbar-menu v-on:selection="onMenuSelection"></navbar-menu>
            
                <div class="row tabs-row">
                    <ul id="navbar-tabs" class="tabs tabs-transparent">
                        <template v-for="(suite,index) in suites">
                        <li class="tab col s3">
                            <a draggable="false" v-on:click="onTabSelected(index)" v-bind:href="'#tab'+index" v-bind:class="{ active: index===0 }">
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
            if (this.suites.length < 6) {
                this.suites.push(new Suite("Suite " + (this.suites.length + 1)));
                UserConfig.saveConfig();
                this.selectTab(this.suites.length - 1);
            }
        },
        deleteSuite() {
            if (this.suites.length > 1) {
                this.suites.splice(AppStatus.activeSuite, 1);
                this.selectTab(AppStatus.activeSuite);
                UserConfig.saveConfig();
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
