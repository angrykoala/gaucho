

type TaskConstructorOptions = {
    title: string;
    command: string;
    path: string;
}

export class Task {
    public readonly title: string;
    public readonly command: string;
    public readonly path: string;

    constructor(options: TaskConstructorOptions) {
        this.title = options.title;
        this.command = options.command;
        this.path = options.path
    }


    public run() {
    }


}
