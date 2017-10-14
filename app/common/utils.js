"use strict";

module.exports = {
    generateTimeString(time) {
        const seconds = time % 60;
        time = Math.trunc(time / 60);
        const minutes = time % 60;
        const hours = Math.trunc(time / 60);

        let res = "";

        if (hours > 0) {
            if (hours < 10) res += "0";
            res += `${hours}:`;
        }
        if (minutes < 10) {
            res += "0";
        }
        res += `${minutes}:`;
        if (seconds < 10) {
            res += "0";
        }
        res += seconds;

        return res;
    },
    isDevEnv() {
        return process.env.NODE_ENV === "dev";
    },
    timer(eventEmitter, intervalTime) {
        setInterval(() => {
            eventEmitter.emit("time-update");
        }, intervalTime);
    }
};
