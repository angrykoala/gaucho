<template>
<div v-once>
    <div class="columns description is-mobile" v-for="field of fields">
        <div class="column">
            <code>{{field.shortcut}}</code>
        </div>
        <div class="column">
            <p>{{field.description}}</p>
        </div>
    </div>
</div>
</template>

<script>
"use strict";

const fields = [{
    shortcut: "CTRL+E",
    description: "Enable/Disable edit"
}, {
    shortcut: "CTRL+M",
    description: "Open/Close menu"
}, {
    shortcut: "CTRL+TAB",
    description: "Jump to the next suite"
}, {
    shortcut: "CTRL+SHIFT+TAB",
    description: "Jump to the previous suite"
}, {
    shortcut: "CTRL+S",
    description: "Open/Close settings"
}];


module.exports = {
    data() {
        return {
            fields: fields
        };
    }
};
</script>

<style lang="scss" scoped>
.description {
    align-items: center;
    display: flex;
    margin-bottom: 5px;
    code {
        border: 1px solid;
        padding: 1px;
        border-radius: 4px;
        text-transform: lowercase;
        margin-right: 5px;
    }
}
</style>
