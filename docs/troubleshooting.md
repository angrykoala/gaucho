---
sidebar_position: 5
---

# Troubleshooting
This document details known errors and problems that may happen when building, running and testing Gaucho.

## Using Gaucho

## Task fails with message: Error: spawn /bin/sh ENOENT
* **Problem**: When running a task, it fails with the message `Error: spawn /bin/sh ENOENT`.
* **Solution**: This error message may appear when the path of the task is not valid (e.g. it does not exists or user does not have enough permissions).

## Building
Some problems that may happen while executing `npm run dist`:

### Error while building deb: spawn icn2png		
* **Problem**: While building, the process fails with the message `Unhandled rejection Error: Exit code: ENOENT. spawn icns2png ENOENT`		
* **Solution**: Install `icnsutils` and `graphicsmagick`		

### Error building rpm: Missing 'rpmbuild'		
* **Problem**: Message `Need executable 'rpmbuild' to convert dir to rpm` while building with rpm		
* **Solution**: Install `rpm` package

### Error with module rabin-bindings
* **Problem**: Error: `The module '/home/andrew/Git/gaucho/node_modules/rabin-bindings/build/Release/rabin-bindings.node' was compiled against a different Node.js version`
* **Solution**: Remove `node_modules` folder and execute `npm install`

### Error building pacman
* **Problem**: Trying to build for Pacman throws `Error: Exit code: 1. Command failed`
* **Solution**: Install `bsdtar` package

### Cannot check wine version
* **Problem**: While building for windows `Error: Exit code: ENOENT. spawn wine ENOENT`
* **Solution**: If you are in Linux or Mac, install [wine](https://www.winehq.org/)

:::note
Other building problems can be found documented in the [official documentation of electron-builder](https://github.com/electron-userland/electron-builder/blob/master/docs/multi-platform-build.md#linux)
:::

## Running tests
Problems that may appear while running the automatic tests

### Test coverage problem in windows
* **Problem**: Message `No coverage information was collected, exit without writing coverage information` appears while trying to run `npm test`
* **Solution**: Run `istanbul cover node_modules/mocha/bin/_mocha -- -R spec` instead

### SyntaxError: Unexpected token
* **Problem**: Executing tests or running Gaucho will fail with an error `SyntaxError: Unexpected token...`
* **Solution**: Make sure you are running Gaucho with a supported node version (8.9.3 or higher)
