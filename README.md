Gaucho
======
_by @angrykoala_    
[![Build Status](https://travis-ci.org/angrykoala/gaucho.svg?branch=master)](https://travis-ci.org/angrykoala/gaucho)

> Minimalistic task launcher

![Gaucho Screenshot](https://user-images.githubusercontent.com/5960567/32335225-a59d59d2-bfec-11e7-9f5f-73b432d5e82d.png)   
_Gaucho 0.4.0_

## Download

Gaucho can be downloaded [here](https://github.com/angrykoala/gaucho/releases).
Available versions for Linux, Mac and Windows (32 and 64 bits).

To use, unzip in the desired location and execute gaucho (execute file depends on you OS).

If you need a different version, please, follow the [development instructions](#development) to make your own build from the source code

## Usage
Gaucho allows you to configure _tasks_ as part of different _suites_ or groups you can access the different suites by clicking on its name in the navbar menu.

### Executing tasks
On each suite, you will find the list of possible tasks to launch. By clicking on _Run_ you will start that task. Clicking the same button again (now the _Stop_ button) you can stop the tasks.

You can easily see the _name_, _execution time_ and _status_ of each task. The _status_ (shown with the status icon) can be _idle_ (black), _running_ (blue), _successful_ (green) or _failed_ (red).

Clicking in the task name the _log_ will be displayed, allowing you to check the task output in real time.

### Creating and Editing tasks
By clicking the _Edit_ button (on the top right corner) you'll be able to edit the suites and tasks.

You can add new tasks to the current suite by clicking _"Add New Task"_ at the bottom of the list. By clicking on a task name you'll be able to edit that task.

While editing/creating a new tasks, you should add a _name_ to the task and a _command_. The command can be any shell/terminal accepted command or an executable file. Optionally a path can be added as well, if no path is added, the gaucho execution path will be used.

The tasks can be deleted by clicking the _Delete_ button.

> Keep in mind that you won't be able to run new tasks in edit mode

While in edit mode, suites names can also be changed by clicking on it. To close edit mode simply click again on the edit button.

### Menu
Next to the edit button, is the menu button. When clicking the menu, several options will be shown, those options may change if the edit mode is active:

**Normal mode**   
* _Run Suite_: Runs all tasks in the current suite (except those already running)
* _Stop Suite_: Stops all running tasks in suite

**Edit mode**  
* _Add new Suite_: Created a new suite
* _Delete Suite_: Deletes current suite

**Other menus**
* _Configuration_: Will show the configuration menu
* _About_: Some information about Gaucho such as the version you are running

### User and Tasks Configuration
All tasks and user changes are saved automatically when closing gaucho. This includes all the tasks/suites information as well as the window size.


## Development
If you want to contribute to Gaucho, create a new different version of Gaucho, or compile it from source code, follow these instructions.

Clone/download source code from the github repo. Make sure you have _node_ and _npm_ already installed in your system:

1. `npm install` to install electron and all the dependencies.
2. `npm start` to start _gaucho_.
    * `npm run start-dev` to run _gaucho_ with chrome dev tools enabled.
3. `npm run dist` to build and package _gaucho_ for your system. The artifacts are located in `dist/`.
    * If you want to pass arguments to build to other architectures, platforms and/or targets, add `--` at the end and then write the arguments, like this: `npm run dist -- -l --ia32`. The arguments are documented in [electron-builder docs](https://www.electron.build/cli)
    * **Experimental**: To get armv7l builds, execute `npm run dist -- --armv7l`
    * If you encounter a problem while building, please, check [Common Issues](https://github.com/angrykoala/gaucho/wiki/Common-Issues)
4. `npm run dist-all` to build and package _gaucho_ for all supported architectures and platforms.
5. `npm test` to run the automated tests.
    * Please, ensure the tests are passing before creating a pull requests. Add tests for your changes.

## Acknowledgments

* [@aebsubis](https://github.com/aebsubis) for designing [Gaucho Logo](https://github.com/angrykoala/gaucho/blob/master/resources/logos/gaucho_logo.png).
* [Electron](https://electron.atom.io)  framework was used for the app development.


## License
Gaucho is being developed and maintained as Open-Source software by @angrykoala (https://github.com/angrykoala) licensed under [GNU GENERAL PUBLIC LICENSE version 3](https://github.com/angrykoala/gaucho/blob/master/LICENSE)

The original source code can be found at: <https://github.com/angrykoala/gaucho>

> You can find more information about Gaucho in the [official wiki](https://github.com/angrykoala/gaucho/wiki)
