"use strict";

const os = require('os');
const yerbamate = require('yerbamate');

const TaskStatus = require('./task_status');
const {TaskTimer, InverseTaskTimer} = require('./task_timer');
const utils = require('./utils');
const constants = require('../../common/constants');

const outputMaxSize = 6000;

class Task {
    constructor(options) {
        this.title = options.title.trim() || "";
        this.command = options.command || "";
        this.description = this._formatDescription(options.description);
        this.path = options.path || "";
        this.env = options.env || [];
        this.status = TaskStatus.idle;

        this.output = null;
        this.timer = null;

        this._scheduleTimeout = null;
    }

    get elapsedTime() {
        if (!this.timer) return null;
        return this.timer.elapsedSeconds;
    }


    run(done) {
        this._clearSchedulerTimeout();
        if (this.isRunning()) {
            throw new Error("Trying to run task without stopping it first");
        }
        this.timer = new TaskTimer();
        this.output = "";
        this.status = TaskStatus.running;
        this.timer.start();
        let executionPath = this.path;
        if (!executionPath) executionPath = this._generateDefaultPath();
        const onOutput = (out) => {
            this.output += `\n${out}`;
            this.output = this.output.slice(-outputMaxSize).trim();
        };
        this.proc = yerbamate.run(this._processCommand(), executionPath, {
            stderr: onOutput,
            stdout: onOutput,
            maxOutputSize: 1,
            env: this._getEnvVariables()
        },
        (code) => {
            if (this.status !== TaskStatus.stopped) this.status = yerbamate.successCode(code) ? TaskStatus.ok : TaskStatus.error;

            this.timer.stop();
            done();
        });
    }

    stop(cb) {
        this._clearSchedulerTimeout();
        if (this.isRunning()) {
            yerbamate.stop(this.proc, cb);
            this.status = TaskStatus.stopped;
        } else {
            this.status = TaskStatus.stopped;
            if (cb) cb();
        }
    }

    isRunning() {
        return this.status === TaskStatus.running;
    }

    isScheduled() {
        return this.status === TaskStatus.scheduled;
    }

    getData() {
        const res = {
            title: this.title,
            command: this.command
        };
        if (this.env && this.env.length > 0) res.env = this.env;
        if (this.path !== "") res.path = this.path;
        if (this.description !== "") res.description = this.description;
        return res;
    }

    schedule(seconds, onRun, done) {
        this.stop(() => {
            this.status = TaskStatus.scheduled;
            this.timer = new InverseTaskTimer(seconds);
            this.timer.start();
            this._scheduleTimeout = setTimeout(() => {
                onRun();
                this.run(done);
            }, seconds * 1000);
        });
    }

    clone() {
        return new Task({
            title: this.title,
            description: this.description,
            path: this.path,
            command: this.command,
            env: this.env});
    }

    _processCommand() {
        return this.command.replace(/(^|\s)sudo($|\s)/g, "$1pkexec$2");
    }

    _generateDefaultPath() {
        return os.homedir();
    }

    _clearSchedulerTimeout() {
        if (this._scheduleTimeout) {
            clearTimeout(this._scheduleTimeout);
            this.timer = null;
        }
        this._scheduleTimeout = null;
    }

    _getEnvVariables() {
        const res = this.env.reduce((acc, envVar) => {
            if (!envVar[0] || !envVar[1]) return acc;
            acc[envVar[0]] = envVar[1];
            return acc;
        }, {});
        return res;
    }

    _formatDescription(originalDescription) {
        const description = originalDescription || "";
        return utils.truncate(description.trim(), constants.maxDescriptionLength).trim();
    }
}

Task.TaskStatus = TaskStatus;

module.exports = Task;
