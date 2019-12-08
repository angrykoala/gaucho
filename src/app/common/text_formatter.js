"use strict";

const Convert = require('ansi-to-html');
const convert = new Convert({
    escapeXML: true
});

module.exports = {
    formatTaskOutput(rawOutput) {
        return convert.toHtml(rawOutput || "");
    }
};
