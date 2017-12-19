"use strict";

const AppConfig = require('../../common/app_config');

const appConfig = new AppConfig.User();

module.exports = {
    state: {
        bottomBar: appConfig.get("bottomBar"),
        animatedSpinner: appConfig.get("animatedSpinner"),
        showTimer: appConfig.get("showTimer")
    },
    mutations: {
        toggleBottomBar(state) {
            const newValue = !state.bottomBar;
            appConfig.set("bottomBar", newValue);
            state.bottomBar = newValue;
        },
        toggleAnimatedSpinner(state) {
            const newValue = !state.animatedSpinner;
            appConfig.set("animatedSpinner", newValue);
            state.animatedSpinner = newValue;
        },
        toggleShowTimer(state) {
            const newValue = !state.showTimer;
            appConfig.set("showTimer", newValue);
            state.showTimer = newValue;
        }
    }
};
