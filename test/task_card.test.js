const Application = require('spectron').Application;
const assert = require('assert');

describe('Spectron tests', function () {
    this.timeout(10000);

    beforeEach(function () {
        this.app = new Application({
            path: './node_modules/.bin/electron',
            args: ['main.js']
        });
        return this.app.start();
    });

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('shows an initial window', function () {
        return this.app.client.getWindowCount().then((count) => {
            assert.equal(count, 1);
        });
    });

    it('shows tooltip on mouse hover', function () {
        let selector = '.task-card:nth-child(1) .tooltip';
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
});
