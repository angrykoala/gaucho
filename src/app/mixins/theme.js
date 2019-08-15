"use strict";

module.exports = {
    computed: {
        theme() {
            const theme = this.$store.state.userConfig.theme || "light";
            return `theme-${theme}`;
        }
    }
};
