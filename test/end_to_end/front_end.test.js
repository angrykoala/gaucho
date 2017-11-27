"use strict";

const assert = require('chai').assert;
const testConfig = require('./config');

describe('Frontend tests', function () {
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

    it('Menu using Tab', async () => {
        await app.client.waitUntilWindowLoaded();
        await app.client.keys(['Tab', 'Enter']);
        await browser.waitForVisible("#navbar-menu");
        app.client.keys(['Tab']);
        const hasFocus = await app.client.hasFocus("#navbar-menu a:nth-child(1)");
        assert.isTrue(hasFocus);
    });

    it("Open Config Menu", async () => {
        await browser.waitUntilWindowLoaded();
        await browser.click("#navbar-menu-button");
        await browser.waitForVisible("#navbar-menu");

        await browser.click(".menu-button=Configuration");
        const isVisible = await browser.isVisible("#config-modal");
        assert.isTrue(isVisible);
    });

    it("Open About Menu", async () => {
        await browser.waitUntilWindowLoaded();
        await browser.click("#navbar-menu-button");
        await browser.waitForVisible("#navbar-menu");

        await browser.click(".menu-button=About");
        await browser.waitForVisible("#swal2-content");
        const aboutTitle = await browser.getText('#swal2-title');
        assert.strictEqual(aboutTitle, "Gaucho");

        await browser.click("button.swal2-confirm");
        await browser.waitForVisible("#swal2-content", 1000, true);
    });

});
