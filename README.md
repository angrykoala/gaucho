Gaucho
======
_by @angrykoala_    
[![Build Status](https://travis-ci.org/angrykoala/gaucho.svg?branch=master)](https://travis-ci.org/angrykoala/gaucho)

> Minimalistic task launcher

![Gaucho Screenshot](https://angrykoala.github.io/gaucho/images/gaucho_preview.png)   
_Gaucho 0.6.1_

## Features

* Easily run commands using a simple GUI.
* Schedule your tasks.
* Available for Windows, Linux and Mac.
* Import/Export tasks.
* Handy log output.
* Themes.

## Download

Gaucho is available for Windows, Mac and Linux. It can be downloaded on the following links:
* [Official Releases](https://github.com/angrykoala/gaucho/releases) (All versions)
* [Snap store](https://snapcraft.io/store) (Linux)
* [Softpedia](https://www.softpedia.com/get/System/System-Miscellaneous/Gaucho.shtml) (Windows)

If you need a different version, please, follow the [development instructions](#development) to make your own build from the source code or [leave an issue](https://github.com/angrykoala/gaucho/issues).

## Usage
Gaucho is organized through configurable tasks that belong to Suites. Each task can be easily configured by providing a name and command. Tasks can be executed independently, or the whole suite can be executed as once.

### Executing tasks
On each suite, you will find the list of possible tasks to launch. By clicking on _Run_ you will start that task. Clicking the same button again (now the _Stop_ button) will stop the task.

You can easily see the _name_, _execution time_ and _status_ of each task. The _status_ (shown with the status icon) can be _idle_ (black), _running_ (blue), _successful_ (green) or _failed_ (red).

Clicking in the task name the _log_ will be displayed, allowing you to check the task output in real time.

A task can also be scheduled through the [context menu](#context-menu). This menu also allows to perform some of the actions described above.

### Creating and Editing tasks
By clicking the _Edit_ button (on the top right corner) you'll be able to edit the suites and tasks (edit mode).

You can add new tasks to the current suite by clicking _"Add New Task"_ at the bottom of the list. By clicking on a task name you'll be able to edit that task.

While editing/creating a new tasks, you should add a _name_ to the task and a _command_. The command can be any shell/terminal accepted command or an executable file. Optionally a _path_ can be added as well, if no path is added, default user path will be used.

The tasks can be deleted by clicking the _Delete_ button. In this mode you can also move tasks (clicking on the drag handle), reorder suites, create suites (+ button), delete and rename suites and tasks (through the [context menu](#context-menu))

### Context Menu

The Context menu can be accessed by clicking on the secondary button of the mouse, depending on where is clicked (task or suite), different actions will appear. These actions will not change whether you are in edit mode or not.

### Main Menu
Next to the edit button, is the menu button. When clicking the menu, several options will be shown, those options may change depending if the edit mode is active or not. This menu allows you to go to the settings menu, quit the application, or perform actions over the current selected suite.

### User and Tasks Configuration
All tasks and user changes are saved automatically on real time. This includes all the tasks/suites information as well as the window size.

### Settings
In the settings menu, you'll be able to configure how Gaucho looks (themes and some display options). You can also export and import all your suites to a file (useful to share or sync tasks between multiple Gaucho applications). Keep in mind that importing tasks will delete all currently existing tasks

## Development
If you want to contribute to Gaucho, create a new different version of Gaucho, or compile it from source code, follow these instructions.

> Node 10.16.0 or higher recommeded

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

**Release to snap:**
1. snapcraft login
2. snapcraft push Gaucho_0.6.0_amd64.snap --release=stable

> Only for collaborators!!

### Troubleshooting

Check [Troubleshooting Page](https://github.com/angrykoala/gaucho/wiki/Common-Issues)

## Acknowledgments

* [@aebsubis](https://github.com/aebsubis) for designing [Gaucho Logo](https://github.com/angrykoala/gaucho/blob/master/resources/logos/gaucho_logo.png).
* [Electron](https://electron.atom.io)  framework was used for the app development.

## License
Gaucho is being developed and maintained as Open-Source software by @angrykoala (https://github.com/angrykoala) licensed under [GNU GENERAL PUBLIC LICENSE version 3](https://github.com/angrykoala/gaucho/blob/master/LICENSE)

The original source code can be found at: <https://github.com/angrykoala/gaucho>

> You can find more information about Gaucho in the [official wiki](https://github.com/angrykoala/gaucho/wiki)


[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/gaucho)
