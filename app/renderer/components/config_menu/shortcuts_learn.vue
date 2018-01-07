<template>
    <div class="shortcuts-learn">
        <h4>Shortcuts</h4>
        <div class="description"><code>CTRL+E</code> Enable/Disable edit</div>
        <div class="description"><code>CTRL+M</code> Open menu</div>
        <div class="description"><code>CTRL+TAB</code> Jump to the next suite</div>
        <div class="description"><code>CTRL+SHIFT+TAB</code> Jump to the previous suite</div>
    </div>
</template>


<style lang="scss" scoped>
.shortcuts-learn {
    h4 {
        font-size: 15px;
        color: #9e9e9e;
        margin-top: 25px;
    }
    .description {
        align-items: center;
        display: flex;
        margin-bottom: 5px;
    }

    code {
        border: 1px solid;
        padding: 1px;
        border-radius: 4px;
        text-transform: lowercase;
        font-size: small;
        margin-right: 5px;
    }
}
</style>
