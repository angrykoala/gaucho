<template>
    <!-- <div class="bottom-bar unselectable-text">
        <nav class="navbar navbar-inverse">
            <div class="left-content">
                <b>Total Tasks:</b> {{totalTasks}}
            </div>
            <div class="right-content">
                <b>Running Tasks:</b> {{runningTasks}}
            </div>
        </nav>
    </div> -->


    <nav class="navbar is-light is-fixed-bottom">
        <div class="navbar-menu is-active">
            <div class="navbar-start">
                <div class="navbar-item">
                    <b>Total Tasks:</b> {{totalTasks}}
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <b>Running Tasks:</b> {{runningTasks}}
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


<style lang="scss" scoped>
// .left-content {
//     float: left;
//     padding-left: 20px;
//     width: 50%;
// }
//
// .right-content {
//     float: right;
//     padding-right: 20px;
// }
//
// .bottom-bar>.navbar {
//     height: 56px;
//     line-height: 56px;
// }

</style>
