const yerbamate = require('yerbamate');
require('./app/components/run-card');
var tasks = require('./tasks.json');

var app = new Vue({
    el: '#app',
    data: {
        tasks: tasks
    }
})
