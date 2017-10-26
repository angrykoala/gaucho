"use strict";

const AppConfig = require('../common/app_config');

module.exports = class AppConfigStatus {
    constructor() {
        this.appConfig = new AppConfig.User();
        this._bottomBar = this.appConfig.get("bottomBar");
        this._animatedSpinner = this.appConfig.get("animatedSpinner");
        this._showTimer = this.appConfig.get("showTimer");
    }
    set bottomBar(value) {
        this._bottomBar = value;
        this.appConfig.set("bottomBar", value);
    }
    set animatedSpinner(value) {
        this._animatedSpinner = value;
        this.appConfig.set("animatedSpinner", value);
    }
    set showTimer(value) {
        this._showTimer = value;
        this.appConfig.set("showTimer", value);
    }
    get bottomBar() {
        return this._bottomBar;
    }
    get animatedSpinner() {
        return this._animatedSpinner;
    }
    get showTimer() {
        return this._showTimer;
    }
};
