<template>
<p>{{task.name}}</p>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';


export default defineComponent({
    props: ["task"],
});
</script>
