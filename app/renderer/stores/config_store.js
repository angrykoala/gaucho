"use strict";

const AppConfig = require('../../common/app_config');

const appConfig = new AppConfig.User();

module.exports = {
    state: {
        bottomBar: appConfig.get("bottomBar"),
        showTimer: appConfig.get("showTimer")
    },
    mutations: {
        setBottomBar(state, value) {
            const newValue = value;
            appConfig.set("bottomBar", newValue);
            state.bottomBar = newValue;
        },
        setShowTimer(state, value) {
            const newValue = value;
            appConfig.set("showTimer", newValue);
            state.showTimer = newValue;
        }
    }
};
