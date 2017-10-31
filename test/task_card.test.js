const Application = require('spectron').Application;
const assert = require('assert');

describe('Application launch', function () {
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
});
