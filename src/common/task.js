"use strict";

const os = require('os');
const yerbamate = require('yerbamate');

const TaskStatus = require('../common/task_status');
const {TaskTimer, InverseTaskTimer} = require('./task_timer');

const outputMaxSize = 6000;

class Task {
    constructor(title, path, command) {
        this.title = title.trim() || "";
        this.command = command || "";
        this.path = path || "";
        this.status = TaskStatus.idle;

        this.output = null;
        this.timer = null;

        this._scheduleTimeout = null;
    }

    get elapsedTime() {
        if(!this.timer) return null;
        return this.timer.elapsedSeconds;
    }


    run(stdout, done) {
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
            stdout(this.output);
        };
        this.proc = yerbamate.run(this._processCommand(), executionPath, {
            stderr: onOutput,
            stdout: onOutput,
            maxOutputSize: 1
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
        } else{
            this.status = TaskStatus.stopped;
            if(cb) cb();
        }
    }

    isRunning() {
        return this.status === TaskStatus.running;
    }

    isScheduled() {
        return this.status === TaskStatus.scheduled;
    }

    getData() {
        let res = {
            title: this.title,
            command: this.command
        };
        if (this.path !== "") res.path = this.path;
        return res;
    }

    schedule(seconds, stdout, onRun, done) {
        this.stop(() => {
            this.status = TaskStatus.scheduled;
            this.timer = new InverseTaskTimer(seconds);
            this.timer.start();
            this._scheduleTimeout = setTimeout(() => {
                onRun();
                this.run(stdout, done);
            }, seconds * 1000);
        });
    }

    _processCommand() {
        return this.command.replace(/(^|\s)sudo($|\s)/g, "$1pkexec$2");
    }

    _generateDefaultPath() {
        return os.homedir();
    }

    _clearSchedulerTimeout() {
        if(this._scheduleTimeout) {
            clearTimeout(this._scheduleTimeout);
            this.timer = null;
        }
        this._scheduleTimeout = null;
    }
}

Task.TaskStatus = TaskStatus;

module.exports = Task;
