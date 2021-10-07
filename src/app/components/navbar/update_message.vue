<template>
    <a class="download-link" href="#" @click="openDownloadLink" v-if="displayMessage">
        <span class="icon">
            <i class="fas fa-cloud-download-alt"></i>
        </span>
        Update available!
    </a>
</template>

<script>
"use strict";

const semver = require('semver');
const GauchoCloudApi = require('../../api/gaucho_cloud');
const {shell} = require('electron');

module.exports = {
    data(){
        return {
            displayMessage: false
        }
    },

    async mounted() {
        if(this.$store.state.userConfig.checkUpdates){
            try {
                const response = await GauchoCloudApi.fetchCurrentInfoVersion();
                const latestVersion = response.tag_name;
                const currentVersion = this.$store.getters.version;
                if (semver.gt(latestVersion, currentVersion)) {
                    this.displayMessage=true;
                }
            } catch (err) {
                console.warn("Error in fetching version info");
                console.warn(err);
            }
        }
    },
    methods: {
        openDownloadLink() {
            shell.openExternal('https://angrykoala.github.io/gaucho/download/');
        }
    }
};

</script>


<style lang="scss" scoped>
    .download-link {
        font-weight: 800;

        &:hover {
            color: #1679e0;
        }

        &:active {
            color: black;
        }
    }

</style>
