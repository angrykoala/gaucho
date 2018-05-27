"use strict";

const Vue = require('vue/dist/vue.common');

const bus = new Vue();

module.exports = class EventHandler {
    static emit(eventName, arg) {
        bus.$emit(eventName, arg);
    }

    static on(eventName, cb) {
        bus.$on(eventName, cb);
    }

    static off(eventName) {
        bus.$off(eventName);
    }
};
