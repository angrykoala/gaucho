<template>
    <div>
        <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item unselectable">
                    <img class="logo-icon" src="resources/logos/gaucho_logo.ico">
                    <h1 class="title is-4">Gaucho</h1>
                    <h2 class="beta-subtitle is-4">Beta</h2>
                </div>
            </div>
            <div class="navbar-menu is-active">
                <div class="navbar-end">
                    <a :class="{selected: editMode}" class="navbar-item" @click.prevent="switchEdit" >
                        <span class="icon">
                            <i class="fas fa-edit" title="Edit"/>
                        </span>
                    </a>
                    <a class="navbar-item" @click.stop="openMenu">
                        <span class="icon">
                            <i class="fas fa-bars" title="Menu"/>
                        </span>
                    </a>
                </div>
            </div>
            <navbar-menu @select="menuSelect"/>
            <suite-tabs class="suite-tabs"/>
        </nav>
    </div>
</template>



<script>
"use strict";

const EventHandler = require('../utils/event_handler');
const AppAlert = require('../api/app_alerts').AppAlert;

const components = {
    "navbar-menu": require('./navbar_menu.vue'),
    "suite-tabs": require('./suite_tabs.vue')
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
        menuSelect(selection) {
            switch(selection) {
                case "about":
                    this.openAboutModal();
                    break;
                case "settings":
                    this.$store.commit("toggleSettings");
                    break;


            }
        },
        switchEdit() {
            this.$store.commit("toggleEdit");
        },
        openAboutModal() {
            const aboutHtml =
                `<i>Version: ${this.$store.getters.version}</i>
                <p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at:</br>
                <a href="#">https://github.com/angrykoala/gaucho</a></p>`;
            const modal = new AppAlert("<h4>Gaucho</h4>", {
                showCloseButton: false,
                confirmButtonColor: "#ee6e73",
                confirmButtonText: "Close"
            }).html(aboutHtml);
            modal.toggle();
        }
    }
};

</script>


<style lang="scss" scoped>
.navbar{
    flex-wrap: wrap;
}
.first-row{
    width:100%;
}
.logo-icon {
    padding-right: 5px;
}

.title {
    margin-bottom: 0;
}

.beta-subtitle {
    padding-top: 12px;
    padding-left: 4px;
}

.navbar-logo {
    cursor: pointer;
}

.suite-tabs{
    width:100%;
}

.navbar-item{ // Sorry for this
        &:hover {
            background-color: transparent !important;
            color: #3273dc !important;
        }
        &.selected {
            background-color: #e8e8e8 !important;
            color: #3273dc !important;
        }
}


</style>
