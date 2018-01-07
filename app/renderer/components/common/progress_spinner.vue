<template>
<div class="progress-spinner">
    <div class="preloader-wrapper active progress-badge">
        <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
.progress-badge {
    width: 20px;
    height: 20px;
    top: 6px;
}
.progress-spinner {
  float: left;
}
</style>
