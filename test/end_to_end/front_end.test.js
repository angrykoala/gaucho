const Application = require('spectron').Application;
const assert = require('assert');

describe('Frontend tests', function () {
    this.timeout(20000); // needed for Travis builds
    const app = new Application({
        path: './node_modules/.bin/electron',
        args: ['main.js'],
        startTimeout: 20000 // timeout for ChromeDriver start
    });
    beforeEach(() => {
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('Shows an initial window', () => {
        return app.client.getWindowCount().then((count) => {
            assert.equal(count, 1);
        });
    });

    it('Shows tooltip on mouse hover', () => {
        const selector = '.task-card:nth-child(1) .tooltip';
        return app.client.waitUntilWindowLoaded()
            .then(() => {
                app.client.moveToObject(selector);
                return app.client.element(selector);
            })
            .then((element) => {
                return app.client.elementIdCssProperty(element.value.ELEMENT, 'visibility');
            })
            .then((visibility) => {
                assert.equal(visibility.value, "visible");
            });
    });

    it('Allows selection of side menu and its items with "Tab" key', () => {
        const menuSelector = '#navbar-menu';
        const configSelector = '#config-modal';
        const aboutSelector = '#swal2-content';

        return app.client.waitUntilWindowLoaded()
            .then(() => {
                app.client.keys(['Tab', 'Enter']);
                return app.client.element(menuSelector);
            })
            .then((element) => {
                return app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
            })
            .then((display) => {
                assert.equal(display.value, 'block');
            })
            .then(() => {
                app.client.keys(['Tab', 'Tab', 'Tab', 'Enter']);
                return app.client.element(configSelector);
            })
            .then((element) => {
                return app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
            })
            .then((display) => {
                assert.equal(display.value, 'block');
            })
            .then(() => {
                app.client.keys(['Escape', 'Shift+Tab', 'Enter', 'Tab', 'Tab', 'Tab', 'Tab', 'Enter']);
                app.client.waitUntilTextExists('#swal2-title', 'Gaucho')
                    .then(() => {
                        return app.client.element(aboutSelector);
                    })
                    .then((element) => {
                        return app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
                    })
                    .then((display) => {
                        assert.equal(display.value, 'block');
                    });
            });
    });
});
