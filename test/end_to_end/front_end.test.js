const Application = require('spectron').Application;
const assert = require('chai').assert;

describe('Frontend tests', function () {
    this.timeout(20000); // needed for Travis builds
    const app = new Application({
        path: './node_modules/.bin/electron',
        args: ['main.js'],
        startTimeout: 20000 // timeout for ChromeDriver start
    });
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

    it('Shows Initial Window', () => {
        return app.client.getWindowCount().then((count) => {
            assert.equal(count, 1);
        });
    });

    it('Shows Task Status Tooltip On Hover', () => {
        const selector = '.task-card:nth-child(1) .tooltip';
        return app.client.waitUntilWindowLoaded().then(() => {
            app.client.moveToObject(selector);
            return app.client.element(selector);
        }).then((element) => {
            return app.client.elementIdCssProperty(element.value.ELEMENT, 'visibility');
        }).then((visibility) => {
            assert.equal(visibility.value, "visible");
        });
    });

    it('Menu using Tab', () => {
        const menuSelector = '#navbar-menu';

        return app.client.waitUntilWindowLoaded()
            .then(() => {
                app.client.keys(['Tab', 'Enter']);
                return app.client.element(menuSelector);
            }).then((element) => {
                return app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
            }).then((display) => {
                assert.equal(display.value, 'block');
                app.client.keys(['Tab']);
                return app.client.hasFocus("#navbar-menu a:nth-child(1)");
            }).then((hasFocus) => {
                assert.isTrue(hasFocus);
            });
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
