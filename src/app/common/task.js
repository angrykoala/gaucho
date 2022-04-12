"use strict";

const os = require('os');
const yerbamate = require('yerbamate');

const TaskStatus = require('./task_status');
const {TaskTimer, InverseTaskTimer} = require('./task_timer');
const EnvVariableHandler = require('../api/env_variables_handler');

const outputMaxSize = 6000;

class Task {
    constructor(options) {
        this.title = options.title.trim() || "";
        this.command = options.command || "";
        this.path = options.path || "";
        this.env = EnvVariableHandler.filterInvalidEnvVariables(options.env || []);
        this.status = TaskStatus.idle;
        this.scheduled = false;

        this.output = null;
        this.timer = null;

        this._scheduleTimeout = null;
    }

    get elapsedTime() {
        if (!this.timer) return null;
        return this.timer.elapsedSeconds;
    }

    run(globalVariables, done) {
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
            env: this._getEnvVariablesForExecution(globalVariables)
        },
        (statusCode, out, err) => {
            onOutput(out);
            onOutput(err);
            if (this.status !== TaskStatus.stopped){
                this.status = yerbamate.successCode(statusCode) ? TaskStatus.ok : TaskStatus.error;
            }
            this.timer.stop();
            done();
        });
    }

    stop(cb) {
        this._clearSchedulerTimeout();
        if (this.isRunning()) {
            yerbamate.stop(this.proc, () => {
                this.status = TaskStatus.stopped;
                if (cb) cb();
            });
        } else if (cb) cb();
    }

    isRunning() {
        return this.status === TaskStatus.running;
    }

    isScheduled() {
        return this.scheduled;
    }

    getData() {
        const res = {
            title: this.title,
            command: this.command
        };
        if (this.env && this.env.length > 0) res.env = this.env;// EnvVariableHandler.filterInvalidEnvVariables(this.env);
        if (this.path !== "") res.path = this.path;
        return res;
    }

    schedule(options, onRun, done) {
        this.stop(() => {
            this.scheduled = true;
            this.timer = new InverseTaskTimer(options.seconds);
            this.timer.start();
            this._scheduleTimeout = setTimeout(() => {
                onRun();
                this.run(options.globalEnv, () => {
                    done();
                    if (options.repeat && this.status !== TaskStatus.stopped) {
                        this.schedule(options, onRun, done);
                    }
                });
            }, options.seconds * 1000);
        });
    }

    clone() {
        return new Task({
            title: this.title,
            path: this.path,
            command: this.command,
            env: this.cloneEnvVariables()
        });
    }

    cloneEnvVariables() {
        return this.env.map(envVar => envVar.slice());
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
        this.scheduled = false;
    }

    _getEnvVariablesForExecution(globalVariables) {
        const envVariables = globalVariables.concat(this.env); // Local env variables will override global env
        const res = envVariables.reduce((acc, envVar) => {
            if (!envVar[0] || !envVar[1]) return acc;
            acc[envVar[0]] = envVar[1];
            return acc;
        }, {});
        return res;
    }
}

Task.TaskStatus = TaskStatus;

module.exports = Task;
