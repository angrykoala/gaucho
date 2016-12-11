"use strict";

const EventEmitter = require('events');
const UserConfig = require('./user_config');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit: function() {
        this.editMode = !this.editMode;
        userConfig.saveConfig();
    }
};
