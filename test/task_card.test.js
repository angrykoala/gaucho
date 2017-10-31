const Application = require('spectron').Application;
const assert = require('assert');
const electron = require('electron-prebuilt');

describe('Application launch', function () {
    this.timeout(10000);

    beforeEach(function () {
        this.app = new Application({
            path: electron,
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
