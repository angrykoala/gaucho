import { Task } from '../src/core/task';

describe('Task', () => {
    it('Task Run', () => {
        const task = new Task({
            title: "My Title",
            command: "echo hello",
            path: "."
        });

        task.run();
    })
});
