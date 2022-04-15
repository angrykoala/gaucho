<template>
    <footer class="footer">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <b>Total Tasks: {{totalTasks}}</b>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <b>Running Tasks: {{runningTasks}}</b>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    computed: {
        totalTasks(): number {
            return 0;
            // return this.$store.getters.totalTasks;
        },
        runningTasks(): number {
            return 0;
            // return this.$store.getters.runningTasks;
        }
    }
});

</script>


<style lang="scss" scoped>
.footer {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
    padding: 1rem;
}
</style>
