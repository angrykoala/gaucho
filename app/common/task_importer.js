"use strict";

const fs = require('fs');

module.exports = {
    parseToJson(suites, version) {
        const parsedSuites = suites.map((suite) => suite.getData());
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
    import (filename) {
        return new Promise((resolve, reject)=>{
            fs.readFile(filename, 'utf-8', (err, data) => {
                if(err) return reject(err);
                try{
                    const result=JSON.parse(data);
                    return resolve(result);
                }catch(err){
                    return reject(err);
                }
            });
        });
    }
};
