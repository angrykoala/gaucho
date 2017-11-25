const Application = require('spectron').Application;
const assert = require('assert');

describe('Front-end tests', function () {
    this.timeout(20000); // needed for Travis builds

    beforeEach(() => {
        this.app = new Application({
            path: './node_modules/.bin/electron',
            args: ['main.js'],
            startTimeout: 20000 // timeout for ChromeDriver start
        });
        return this.app.start();
    });

    afterEach(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('Shows an initial window', () => {
        return this.app.client.getWindowCount().then((count) => {
            assert.equal(count, 1);
        });
    });

    it('Shows tooltip on mouse hover', () => {
        const selector = '.task-card:nth-child(1) .tooltip';
        return this.app.client.waitUntilWindowLoaded()
            .then(() => {
                this.app.client.moveToObject(selector);
                return this.app.client.element(selector);
            })
            .then((element) => {
                return this.app.client.elementIdCssProperty(element.value.ELEMENT, 'visibility');
            })
            .then((visibility) => {
                assert.equal(visibility.value, "visible");
            });
    });

    it('Allows selection of side menu and its items with "Tab" key', () => {
        const menuSelector = '#navbar-menu';
        const configSelector = '#config-modal';
        const aboutSelector = '#swal2-content';

        return this.app.client.waitUntilWindowLoaded()
            .then(() => {
                this.app.client.keys(['Tab', 'Enter']);
                return this.app.client.element(menuSelector);
            })
            .then((element) => {
                return this.app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
            })
            .then((display) => {
                assert.equal(display.value, 'block');
            })
            .then(() => {
                this.app.client.keys(['Tab', 'Tab', 'Tab', 'Enter']);
                return this.app.client.element(configSelector);
            })
            .then((element) => {
                return this.app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
            })
            .then((display) => {
                assert.equal(display.value, 'block');
            })
            .then(() => {
                this.app.client.keys(['Escape', 'Shift+Tab', 'Enter', 'Tab', 'Tab', 'Tab', 'Tab', 'Enter']);
                this.app.client.waitUntilTextExists('#swal2-title', 'Gaucho')
                    .then(() => {
                        return this.app.client.element(aboutSelector);
                    })
                    .then((element) => {
                        return this.app.client.elementIdCssProperty(element.value.ELEMENT, 'display');
                    })
                    .then((display) => {
                        assert.equal(display.value, 'block');
                    });
            });
    });
});
