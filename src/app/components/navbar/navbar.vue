<template>
    <div>
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item unselectable">
                    <img class="logo-icon" src="../../../../resources/logos/gaucho_logo.ico">
                    <h1 class="title is-4">Gaucho</h1>
                </div>
            </div>
            <div class="navbar-menu is-active">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <update-message></update-message>
                    </div>
                    <a :class="{selected: editMode}" class="navbar-item" @click.prevent="toggleEdit">
                        <span class="icon">
                            <i class="fas fa-edit" title="Edit"></i>
                        </span>
                    </a>
                    <a class="navbar-item" @click.stop="openMenu">
                        <span class="icon">
                            <i class="fas fa-bars" title="Menu"></i>
                        </span>
                    </a>
                </div>
            </div>
            <navbar-menu @select="menuSelect"></navbar-menu>
            <suite-tabs class="suite-tabs"></suite-tabs>
        </nav>
    </div>
</template>


<script>
"use strict";

const ipcRenderer = require('electron').ipcRenderer;
const EventHandler = require('../../event_handler');
const aboutModal = require('../../api/about_modal');

const components = {
    "navbar-menu": require('./navbar_menu.vue'),
    "suite-tabs": require('./suite_tabs.vue'),
    "update-message": require('./update_message.vue')
};


module.exports = {
    components: components,
    computed: {
        editMode() {
            return this.$store.state.editMode;
        }
    },
    methods: {
        openMenu() {
            EventHandler.emit("showNavbarMenu");
        },
        /* eslint-disable complexity */
        menuSelect(selection) {
            switch (selection) {
                case "about":
                    this.openAboutModal();
                    break;
                case "settings":
                    this.$store.commit("toggleSettings");
                    break;
                case "quit":
                    // TODO: extract to method and reuse in app
                    this.$store.dispatch("saveTasks");
                    this.$store.dispatch("stopAllTasks").then(() => {
                        ipcRenderer.send("close-app");
                    });
                    break;
            }
        },
        /* eslint-enable complexity */
        toggleEdit() {
            this.$store.commit("toggleEdit");
        },
        openAboutModal() {
            aboutModal(this.$store);
        }
    }
};
</script>


<style lang="scss" scoped>
.navbar {
    flex-wrap: wrap;
}
.first-row {
    width: 100%;
}
.logo-icon {
    padding-right: 5px;
}

.title {
    margin-bottom: 0;
}

.navbar-logo {
    cursor: pointer;
}

.suite-tabs {
    width: 100%;
}

.navbar-item {
    &:hover {
        background-color: transparent;
        // color: #3273dc;
    }
    &.selected {
        background-color: rgba(41, 40, 40, 0.25);
        // color: #3273dc;
    }
}
</style>
