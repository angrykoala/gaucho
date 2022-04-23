import { Task, TaskStatus } from '../src/core/task';
import { assert } from 'chai';

describe('Task', () => {
    let task: Task;

    afterEach(() => {
        if (task) {
            task.destroy();
        }
    })


    it('Task run', (done) => {
        task = new Task({
            title: "My Title",
            command: "echo hello",
            path: "."
        });

        task.on("finished", () => {
            assert.strictEqual(task.output, "hello\n");
            assert.strictEqual(task.status, TaskStatus.ok);
            done()
        })
        task.run();
        assert.strictEqual(task.status, TaskStatus.running);
    });

    it("Task stop", (done) => {
        task = new Task({
            title: "My Title",
            command: "echo hello && sleep 1 && echo goodbye",
            path: "."
        });

        task.on("finished", () => {
            assert.strictEqual(task.output, "hello\n");
            assert.strictEqual(task.status, TaskStatus.stopped);
            done()
        })
        task.run();
        setTimeout(() => {
            task.stop();
        }, 100)
    });

    it("Task errored", (done) => {
        task = new Task({
            title: "My Title",
            command: "gregrgf",
            path: "."
        });

        task.on("finished", () => {
            assert.isOk(task.output);
            assert.strictEqual(task.status, TaskStatus.error);
            done()
        })
        task.run();
    });
});
