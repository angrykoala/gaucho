# Build From Source Code
Gaucho is built using [Vue](https://vuejs.org/), [Electron](https://www.electronjs.org/)  and packaged with [Electron Builder](https://www.electron.build/). If you plan on modifying or rebuilding electron for a different platform, some knowledge on these tools is recommended.

## Requirements
To build Gaucho from source code, you will need a recent version of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) in your system. Depending on your system, other dependencies may be needed to build [electron](https://www.electronjs.org/).

## Building for your system
Once the repository is cloned:

1. `npm install`.
  * Optionally `npm test` to run tests.
2. `npm run dist`.
3. Any build will be available in the `dist` folder. Check

:::caution
If you encounter any problem, remember to check the [Troubleshooting](/docs/troubleshooting#building) page. If the solution is not there, consider [opening an issue](https://github.com/angrykoala/gaucho/issues/new)
:::
