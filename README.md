Gaucho
======
_by @angrykoala_    
[![Build Status](https://travis-ci.org/angrykoala/gaucho.svg?branch=master)](https://travis-ci.org/angrykoala/gaucho)

> The Minimalist Task Launcher

Gaucho is an open-source, customizable task launcher to run your apps, commands or scripts.
Configure your commands and run them in a non-intrusive interface. Say goodbye to dozens of terminals.
Check https://angrykoala.github.io/gaucho/ to get started.

![Gaucho Screenshot](https://angrykoala.github.io/gaucho/img/tasks.png)   

As a developer, it is quite common to repeat the same commands over an over. Running an app, starting a server, compiling your code or building a front-end for example. Most of these are just background tasks that just need to be running, or executed from time to time. Typing the command is slow, and having a terminal per task consumes our precious screen real state. Gaucho provides a simple way to de-clutter your screen by bundling all of those tasks in a simple menu to run and stop these, quick, and simple.

Just add a name, type a command as you would in your terminal, set any env variable or path needed and you are good to go!

## Features

* Easily run commands using a simple GUI.
* Schedule your tasks.
* Available for Windows, Linux and Mac.
* Organize your tasks.
* Environment variables.
* Import/Export tasks.
* Handy log output.
* Themes.
* Batch execution of tasks.

## Download

Gaucho is available for Windows, Mac and Linux.
[Download here](https://angrykoala.github.io/gaucho/download)

All releases available at https://github.com/angrykoala/gaucho/releases

Gaucho is also available in the [Snap store](https://snapcraft.io/store) (Linux)

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/gaucho)

If you need a different version, please, follow the [development instructions](https://angrykoala.github.io/gaucho/docs/advanced-guides/build-from-source) to make your own build from the source code or [leave an issue](https://github.com/angrykoala/gaucho/issues).

## Usage
> Check the [Official docs](https://angrykoala.github.io/gaucho/docs/intro) for the updated documentation

Gaucho allows you to configure **tasks** that can be grouped in **suites**. Each task can be configured by providing a name and command. Tasks can be executed independently, or the whole suite can be executed as once.

### Creating and Editing tasks
By clicking the _Edit_ button (top right corner). You'll enter the **edit mode** that allows you to create, delete, update and move tasks

You can add new tasks to the current suite by clicking _"Add New Task"_ at the bottom of the list. By clicking on a task name you'll be able to edit that task.

While editing/creating a new tasks, you should add a _name_ to the task and a _command_. The command can be any shell/terminal accepted command or an executable file. Optionally a _path_ can be added as well, if no path is added, default user path will be used.

The tasks can be deleted by clicking the _Delete_ button. In this mode you can also move tasks (clicking on the drag handle), reorder suites, create suites (+ button), delete and rename suites and tasks (through the [context menu](#context-menu))

## Development
If you want to contribute to Gaucho, create a new different version of Gaucho, or compile it from source code, follow these instructions.

> Check the [Official docs](https://angrykoala.github.io/gaucho/docs/advanced-guides/build-from-source) for the updated intructions.

Clone/download source code from the GitHub. Make sure you have _node_ and _npm_ already installed in your system:

1. `npm install` to install electron and all the dependencies.
2. `npm run start-dev` to run _gaucho_ in dev mode with chrome dev tools enabled.
3. `npm run dist` to build and package _gaucho_ for your system. The artifacts are located in `dist/`.
    * If you encounter a problem while building, please, check [Common Issues](https://github.com/angrykoala/gaucho/wiki/Common-Issues)
4. `npm run dist-all` to build and package _gaucho_ for all supported architectures and platforms, it will take a while.
    * Some dependencies may need installing, depending on the system, check the [troubleshooting page](https://github.com/angrykoala/gaucho/wiki/Common-Issues)
5. `npm test` to run the automated tests.
    * `npm run eslint` to run [eslint](https://eslint.org) to check code style.
    * Please, ensure the tests and linter are passing before creating a pull requests. Add tests for your changes.

* To install snap version locally: `snap install --dangerous gaucho_0.6.3_amd64.deb`
* Use `npm run pack` to execute a lightweight built with just the basic version of your OS

**Release to snap (only for collaborators):**
1. snapcraft login
2. snapcraft upload Gaucho_0.6.0_amd64.snap --release=stable


### Troubleshooting

Check [Troubleshooting Page](https://angrykoala.github.io/gaucho/docs/troubleshooting)

## Acknowledgments

* [@aebsubis](https://github.com/aebsubis) for designing [Gaucho Logo](https://github.com/angrykoala/gaucho/blob/master/resources/logos/gaucho_logo.png).
* [Electron](https://electron.atom.io)  framework was used for the app development.

## License
Gaucho is being developed and maintained as Open-Source software by @angrykoala (https://github.com/angrykoala) licensed under [GNU GENERAL PUBLIC LICENSE version 3](https://github.com/angrykoala/gaucho/blob/master/LICENSE)

The original source code can be found at: <https://github.com/angrykoala/gaucho>

> You can find more information about Gaucho License [here](https://angrykoala.github.io/gaucho/license)
