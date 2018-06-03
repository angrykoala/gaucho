<template>
    <nav class="navbar is-fixed-bottom">
        <div class="navbar-menu is-active">
            <div class="navbar-start">
                <div class="navbar-item">
                    <b>Total Tasks: {{totalTasks}}</b>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <b>Running Tasks: {{runningTasks}}</b>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
"use strict";

module.exports = {
    computed: {
        totalTasks() {
            return this.$store.getters.totalTasks;
        },
        runningTasks() {
            return this.$store.getters.runningTasks;
        }
    }
};
</script>
