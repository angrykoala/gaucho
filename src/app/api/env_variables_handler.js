"use strict";

const AppConfig = require('../../common/app_config');

module.exports = class EnvVariableHandler {
    static saveGlobalEnv(data) {
        const tasksConfig = new AppConfig.Tasks();
        const variables = this.filterInvalidEnvVariables(data);
        tasksConfig.set("globalEnv", variables);
        return variables;
    }

    static loadGlobalEnvFromConfig() {
        const tasksConfig = new AppConfig.Tasks();
        const globalEnv = tasksConfig.get("globalEnv");
        return globalEnv || [];
    }

    static filterInvalidEnvVariables(variables) {
        const keys = new Set();
        return variables.filter((envVar) => {
            if (!envVar[0] || !envVar[1]) return false;
            if (keys.has(envVar[0])) return false;
            keys.add(envVar[0]);
            return true;
        });
    }
};
