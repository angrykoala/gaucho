"use strict";

const AppConfig = require('../common/app_config');

module.exports = class AppConfigStatus {
    constructor() {
        this.appConfig = new AppConfig();
        this._bottomBar = this.appConfig.get("bottomBar");
        this._animatedSpinner = this.appConfig.get("animatedSpinner");
    }
    set bottomBar(value) {
        this._bottomBar = value;
        this.appConfig.set("bottomBar", value);
    }
    set animatedSpinner(value) {
        this._animatedSpinner = value;
        this.appConfig.set("animatedSpinner", value);
    }
    get bottomBar() {
        return this._bottomBar;
    }
    get animatedSpinner() {
        return this._animatedSpinner;
    }
};
