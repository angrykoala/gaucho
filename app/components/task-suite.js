Vue.component('task-suite', {
    props: ['suite', 'id'],
    data: () => {
        return {

        };
    },
    template: `
        <div v-bind:id="id">
            <ul class="collapsible" data-collapsible="accordion">
                <template v-for="task in suite.tasks">
                    <run-card v-bind:title="task.title" v-bind:path="task.path || '.'" v-bind:task="task.command"></run-card>
                </template>
            </ul>
        </div>
    `,

    methods: {


    }
});
