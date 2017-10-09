"use strict";

const fs = require('fs');

module.exports = {
    parseToJson(suites, version) {
        const parsedSuites = suites.map((suite) => {
            return suite.getData();
        });
        const content = {
            "suites": parsedSuites,
            "version": version
        };
        return JSON.stringify(content);
    },
    export (filename, suites, version) {
        return new Promise((resolve, reject) => {
            const content = this.parseToJson(suites, version);
            fs.writeFile(filename, content, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    import ( /*content*/ ) {
        throw new Error("Not Yet implemented");
    }
};
