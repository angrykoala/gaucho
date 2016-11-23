"use strict";

const taskCard = require('./task-card')

module.exports = {
    props: ['suite', 'id'],
    data: () => {
        return {

        };
    },
    template: `
        <div v-bind:id="id">
            <ul class="collapsible" data-collapsible="accordion">
                <template v-for="task in suite.tasks">
                    <task-card v-bind:task="task"></task-card>
                </template>
            </ul>
        </div>
    `,

    methods: {


    },
    components: {
        "task-card": taskCard
    }
}
