"use strict";

const AppConfig = require('../../common/app_config');

const appConfig = new AppConfig.User();

module.exports = {
    state: {
        bottomBar: appConfig.get("bottomBar"),
        showTimer: appConfig.get("showTimer"),
        theme: appConfig.get("theme"),
        checkUpdates: process.env.NODE_ENV === "dev" ? false : appConfig.get("checkUpdates")
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
        },
        setCheckUpdates(state, value) {
            appConfig.set("checkUpdates", value)
            state.checkUpdates = value
        }
    }
};
