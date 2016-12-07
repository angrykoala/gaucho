"use strict";

const Suite = require('../suite');
const config = require('../config');
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
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-wrapper">
                <a class="brand-logo left">Gaucho</a>
                <ul class="right">
                    <li><a v-on:click="toggleEdit"><i class="material-icons small">mode_edit</i></a></li>
                    <li><a class="navbar-menu-button" href='#' data-activates='navbar-menu'><i class="material-icons small">menu</i></a></li>
                </ul>
                <navbar-menu></navbar-menu>
            
                <ul id="navbar-tabs" class="tabs tabs-transparent">
                    <template v-for="(suite,index) in suites">
                    <li class="tab col s3">
                        <a v-on:click="onTabSelected(index)" v-bind:href="'#tab'+index" v-bind:class="{ active: index===0 }"><strong>{{suite.title}}</strong>
                        </a>
                    </li>
                    </template>
                </ul>
            </div>
        </nav>
    </div>
    `,
    mounted: function() {
        AppStatus.events.on("add-suite", () => {
            this.addSuite();
        });
        AppStatus.events.on("delete-suite", () => {
            this.deleteSuite();
        });
    },
    methods: {
        addSuite() {
            if (this.suites.length < 6) {
                this.suites.push(new Suite("Suite " + (this.suites.length + 1)));
                config.saveConfig();
                this.selectTab(this.suites.length - 1);
            }
        },
        deleteSuite() {
            if (this.suites.length > 1) {
                this.suites.splice(AppStatus.activeSuite, 1);
                this.selectTab(AppStatus.activeSuite);
                config.saveConfig();
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
            this.AppStatus.editMode = !this.AppStatus.editMode;
        }
    }
};
