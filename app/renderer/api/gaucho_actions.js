"use strict";

const AppStatus = require('../app_status');


// TODO: move this to vuex storage
module.exports = class GauchoActions {
    static toggleActiveSuite(suite) {
        AppStatus.activeSuite = suite;
    }
};
