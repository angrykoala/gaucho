<template>
<p>Hello World2</p>
<button @click="onClick">Click me!</button>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        onClick() {
            console.log("ON CLICK")
        }
    }
});
</script>
