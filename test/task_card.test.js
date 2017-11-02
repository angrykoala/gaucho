const Application = require('spectron').Application;
const assert = require('assert');

describe('Front-end tests for task card', function () {
    this.timeout(20000); // needed for Travis builds

    beforeEach(() => {
        this.app = new Application({
            path: './node_modules/.bin/electron',
            args: ['main.js']
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
});
