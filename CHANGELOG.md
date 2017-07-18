0.2.4 / ####-##-##
==================

  * Added About menu
  * Added CONTRIBUTIONS.md file
  * Remove configuration files from final build

0.2.3 / 2017-07-08
==================

  * Using tile (~) in the path is now supported
  * Increased navbar menu width
  * Changed navbar menu elements text
  * Electron post-install bug fixed, removed patch
  * materializecss and electron dependencies updated
  * Minor interface improvements
  * Added package-lock.json file
  * Added gaucho to npm repository

0.2.2 / 2017-04-30
==================

  * Tasks with same name will now append the number between parenthesis
  * Fixed bug where editing and saving tasks with the same name will append 2
  * Temporal fix on electron installation problem with extract zip
  * Small improvements in unit tests
  * jshint code style checks added as part of the tests
  * Minor code and style refactoring

0.2.1 / 2017-04-25
==================

  * Added Unit tests and test coverage information
  * Save button disabled until command and name filled
  * Tasks now have an unique name per suite
  * Removed empty spaces at the beginning and end of task title
  * Removed "pointer" cursor style
  * Fixed bug where stopping a suite will turn all tasks icons to "stopped"
  * Fixed a small bug where empty paths where stored in the tasks.json file
  * Added Travis CI support
  * Minor code refactoring


0.2.0 / 2017-04-15
==================

  * Gaucho is now "Frameless" so the window style will be the same on every OS
  * Running tasks time will be updated each second using the same timer
  * Add and delete suite buttons disabled when action is invalid
  * Increased minimum window width
  * Tab supported for command input
  * Pressing F11 will no longer make gaucho "fullscreen"
  * Number of tasks per suite limited to 8. Gaucho now supports a maximum of 48 tasks
  * Fixed problem when closing and reopening a maximized window
  * Fixed timers problems when deleting running tasks
  * Fixed problem "Cannot read property 'scrollTop' of null" when deleting a running task
  * Fixed listeners memory leak when deleting tasks or suites
  * General code refactoring
  * Improvements in Readme file

0.1.3 / 2017-03-30
==================

  * All running tasks will stop when closing gaucho
  * Gaucho icon added to navbar
  * Readme updated with better instructions for usage and development
  * Removed moment.js dependency
  * Hours support in execution time
  * Loading times slightly improved
  * Fixed resizing with dev tools bug
  * Build will no longer contain config.json file
  * Task.json will be saved when closing gaucho
  * Added icon as part of the build

0.1.2 / 2017-03-25
==================

  * Added icon
  * Electron and materialize versions fixed
  * Task collapsed after saving in edit mode
  * Added running time to tasks
  * Texts are no longer selectable (except logs and inputs)

0.1.1 / 2016-12-20
==================

  * Window size will be part of the user config
  * Task edit menu added
  * Added minimum size to the window
  * Stopping a running task icon changed, now it will be the same as idle task
  * Fixed problem when cleaning output
  * Changed project structure
  * .jshintrc, .gitignore and task.json removed from build
  * Task.json renamed to tasks.json
  * Added changelog file
  * Added config.json as a separate file from tasks.json

0.1.0 / 2016-12-12
==================

  * Electron packager
  * Yerbamate integration
  * Basic UI
  * Materializecss integration
  * Vue.js framework integration
  * User configuration handler
  * Edit tasks controls
  * Run/Stop tasks controls
  * Multiple suits support
