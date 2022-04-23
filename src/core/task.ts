import { ChildProcessWithoutNullStreams } from 'child_process';
import { EventEmitter } from 'events';
import * as yerbamate from 'yerbamate';

type TaskConstructorOptions = {
    title: string;
    command: string;
    path: string;
}

enum TASK_STATUS {
    RUNNING = "running",
    IDLE = "idle",
    ERROR = "error",
    STOPPED = "stopped",
    OK = "OK"
}

type TaskEvent = "stdout" | "stderr" | "finished" | "error";

type EventCallback = () => void

type TaskProcess = ChildProcessWithoutNullStreams

export class Task {
    public readonly title: string;
    public readonly command: string;
    public readonly path: string;

    private process: TaskProcess | null = null;
    private eventEmiter: EventEmitter;

    private _output: string = ""; // Output represents both, stdout and stderr
    private _status: TASK_STATUS = TASK_STATUS.IDLE

    constructor(options: TaskConstructorOptions) {
        this.title = options.title;
        this.command = options.command;
        this.path = options.path;
        this.eventEmiter = new EventEmitter();
    }

    public get output(): string {
        return this._output;
    }

    public get status(): TASK_STATUS {
        return this._status;
    }

    public destroy(): void {
        // this.eventEmiter.removeAllListeners();
        this.process = null;
    }

    public on(event: TaskEvent, cb: EventCallback): void {
        this.eventEmiter.on(event, cb);
    }

    public run() {
        this.process = yerbamate.run(this.command,{
            stdout: (o)=>this.onOutput(o),
            stderr: (o)=>this.onOutput(o),
            maxOutputSize: 1
        }, (code, _out, _err) => {
            // this.output=out;
            // this.
            this.emit("finished");
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.process) {
                return reject(new Error("Can't stop task: Process does not exists"));
            }
            yerbamate.stop(this.process, (err) => {
                if (err) reject(err);
                resolve();
            });
        })
    }

    private emit(event: TaskEvent) {
        this.eventEmiter.emit(event);
    }

    private onOutput(output: string) {
        this._output += output
    }
}
