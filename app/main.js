require('./app/components/run-card');
require('./app/components/task-suite');
const suites = require('./tasks.json');

const app = new Vue({
    el: '#app',
    data: {
        suites: suites.suites
    }
});
