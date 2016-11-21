require('./app/components/run-card');
const tasks = require('./tasks.json');

const app = new Vue({
    el: '#app',
    data: {
        tasks: tasks
    }
});
