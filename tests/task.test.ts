import { Task } from '../src/core/task';
import { assert } from 'chai';

describe('Task', () => {
    it('Task Run', (done) => {
        const task = new Task({
            title: "My Title",
            command: "echo hello",
            path: "."
        });

        task.on("finished", ()=>{
            assert.strictEqual(task.output, "hello\n")
            done()
        })
        task.run();
    })
});
