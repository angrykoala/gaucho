"use strict";

const url = "https://gaucho-cloud.angrykoala.xyz";

module.exports = {
    async fetchCurrentInfoVersion() {
        const response = await fetch(`${url}/check-updates?source=gaucho`);
        return response.json();
    }
};
