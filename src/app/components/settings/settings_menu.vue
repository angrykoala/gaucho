<template>
<section class="section settings-page" @contextmenu.stop="">
    <a class="back-button" @click="saveSettings">
        <span class="icon is-small">
            <i class="fas fa-arrow-left" />
        </span>
        Go Back
    </a>
    <div class="columns is-mobile is-centered">
        <div class="column is-two-thirds settings-menu">
            <h1 class="title settings-title">Settings</h1>
            <h3 class="settings-subtitle">Display</h3>
            <div class="settings-menu-section">
                <checkbox-item v-model="bottomBar" label="Bottom bar"></checkbox-item>
                <checkbox-item v-model="showTimer" label="Show timer"></checkbox-item>
                <theme-selector v-model="theme"></theme-selector>
            </div>
            <hr>
            <h3 class="settings-subtitle">Actions</h3>
            <settings-actions @resetSettings="resetSettings"></settings-actions>
            <h3 class="settings-subtitle">Shortcuts</h3>
            <div class="settings-menu-section">
                <shortcuts-cheatsheet />
            </div>
        </div>
    </div>
</section>
</template>


<script>
"use strict";


const components = {
    "checkbox-item": require('./checkbox_item.vue'),
    "shortcuts-cheatsheet": require('./shortcuts_cheatsheet.vue'),
    "theme-selector": require('./theme_selector.vue'),
    "settings-actions": require('./settings_actions.vue')
};

module.exports = {
    data() {
        return {
            bottomBar: this.$store.state.userConfig.bottomBar,
            showTimer: this.$store.state.userConfig.showTimer,
            theme: this.$store.state.userConfig.theme
        };
    },
    components: components,
    watch: {
        theme() {
            this.$store.commit("setTheme", this.theme);
        },
        bottomBar() {
            this.$store.commit("setBottomBar", this.bottomBar);
        },
        showTimer() {
            this.$store.commit("setShowTimer", this.showTimer);
        }
    },
    methods: {
        saveSettings() {
            this._close();
        },
        resetSettings() {
            this.bottomBar = true;
            this.showTimer = true;
            this.theme = "classic"
        },
        _close() {
            this.$store.commit("toggleSettings");
        }
    }
};
</script>


<style lang="scss" scoped>
.settings-menu {
    max-width: 650px;
}

.settings-menu-section {
    padding: 10px 20px;
}

.back-button {
    .icon {
        vertical-align: text-top;
    }
}

.settings-page {
    padding-top: 30px;
    height: 100%;
}

.settings-title {
    margin-top: 15px;
}

.settings-subtitle {
    font-size: 15px;
    color: #9e9e9e;
    margin-top: 25px;
}
</style>
