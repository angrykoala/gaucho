<template>
    <div>
        <div class="columns is-mobile" @click="taskSelected">
            <div class="column is-two-thirds">
                <p>{{task.title}}</p>
            </div>
            <div class="column">
                <div class="columns is-mobile">
                    <div class="column">
                        <task-status :status="task.status" class="is-pulled-right"/>
                        <button :class="{'is-danger':running}" class="button is-info is-rounded is-outlined task-button is-pulled-right" @click.stop="toggleRun">{{running? "Stop" : "Run"}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="log" class="columns is-mobile">
            <div class="column">
                <div class="task-output">
                    <pre>{{task.output}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";

const components = {
    "task-status": require('./task_status.vue')
};

module.exports = {
    props: ["task", "log"],
    components: components,
    computed: {
        running() {
            return this.task.isRunning();
        }
    },
    methods: {
        toggleRun() {
            if (this.running) this.stop();
            else this.run();
        },
        run() {
            this.$store.commit('increaseRunningTasks');
            this.task.run(() => {}, () => {
                this.$store.commit('decreaseRunningTasks');
            });
        },
        stop() {
            this.task.stop();
        },
        taskSelected() {
            this.$emit("selected");
        }
    }
};
</script>


<style lang="scss" scoped>
.task-button{
    width: 80px;
}

.columns:not(:last-child){
    margin-bottom: 0;
}

.task-output {
    overflow-y: auto;
    overflow-x: hidden;
    height: 200px;
    background-color: #eeeeee;
    pre {
        margin: 0 0 0 10px;
        overflow: hidden;
        white-space: pre-wrap;
        background-color: transparent;
    }
}
</style>
