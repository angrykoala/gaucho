"use strict";

module.exports = {
    isDevEnv() {
        return process.env.NODE_ENV === "dev";
    },
    isTestEnv() {
        return process.env.NODE_ENV === "test";
    }
};
