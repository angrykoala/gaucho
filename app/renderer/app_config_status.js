"use strict";

const AppConfig = require('../common/app_config');

module.exports = class AppConfigStatus {
    constructor() {
        this.appConfig = new AppConfig();
        this._bottomBar = this.appConfig.get("bottomBar");
        this._configMenu = this.appConfig.get("configMenu");
        this._animatedSpinner = this.appConfig.get("animatedSpinner");
    }
    set bottomBar(value) {
        this._bottomBar = value;
        this.appConfig.set("bottomBar", value);
    }
    set configMenu(value) {
        this._configMenu = value;
        this.appConfig.set("configMenu", value);
    }
    set animatedSpinner(value) {
        this._animatedSpinner = value;
        this.appConfig.set("animatedSpinner", value);
    }
    get bottomBar() {
        return this._bottomBar;
    }
    get configMenu() {
        return this._configMenu;
    }
    get animatedSpinner() {
        return this._animatedSpinner;
    }
};
