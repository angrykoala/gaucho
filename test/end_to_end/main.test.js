"use strict";

const assert = require('chai').assert;
const testConfig = require('./config');

describe.skip('[E2E] Main Frontend', function () {
    this.timeout(20000); // needed for Travis builds
    const app = testConfig.testBrowserSetup();
    let browser;
    beforeEach(() => {
        return app.start().then(() => {
            browser = app.client;
        });
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('Shows Initial Window', async () => {
        const count = await app.client.getWindowCount();
        assert.strictEqual(count, 1);
    });

    it('Shows Task Status Tooltip On Hover', async () => {
        const selector = '.task-card:nth-child(1) .tooltip';
        await browser.waitUntilWindowLoaded();
        await browser.moveToObject(selector);
        const element = await browser.element(selector);
        const visibility = await browser.elementIdCssProperty(element.value.ELEMENT, 'visibility');
        assert.equal(visibility.value, "visible");
    });

});
