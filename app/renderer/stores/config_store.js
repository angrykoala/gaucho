"use strict";

const AppConfig = require('../../common/app_config');

const appConfig = new AppConfig.User();

module.exports = {
    state: {
        bottomBar: appConfig.get("bottomBar"),
        showTimer: appConfig.get("showTimer"),
        theme: appConfig.get("theme")
    },
    mutations: {
        setBottomBar(state, value) {
            appConfig.set("bottomBar", value);
            state.bottomBar = value;
        },
        setShowTimer(state, value) {
            appConfig.set("showTimer", value);
            state.showTimer = value;
        },
        setTheme(state, value) {
            appConfig.set("theme", value);
            state.theme = value;
        }
    }
};
