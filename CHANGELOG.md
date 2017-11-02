0.4.0 / 2017-10-02
==================

  * Added tasks import and export options
  * Tasks can now be moved between suites and reordered while in edit mode
  * Added keyboard shortcuts to some common operations
  * Gaucho icon improved
  * Added confirmation popup when deleting a task, suite or clearing all tasks
  * Tooltips with information about task status when hovering
  * Task timers are now optional
  * Added an initial message, showing the edit button to new users
  * Tasks with no path defined will now be executed on user home directory
  * Config menu will automatically close when importing, exporting and clearing tasks
  * Add Task form now collapses after adding a task
  * About menu style improved
  * Fixed bug that prevented running tasks to be killed when closing Gaucho
  * Fixed bug where deleting a suite doesn't update total tasks in the bottom bar
  * Fixed bug where clearing all tasks doesn't update total tasks
  * Fixed bug where clearing all tasks sometimes broke the Add-task button
  * Fixed bug updating the tasks log when reordering or deleting them
  * Support for 32 bits architecture
  * Electron-packager support dropped, now using electron-builder for better builds
  * Bottom bar text not selectable anymore
  * Code linting rules changed, using eslint instead of jshint
  * Added pre-commit hook
  * Added a dev config environment
  * Code refactoring in several components and modules

0.3.0 / 2017-08-29
==================

  * Bottom bar with some information about tasks
  * Added configuration menu
  * Scroll now only visible inside the suite
  * Window title changed to: Gaucho Task Launcher
  * Clear all tasks button
  * Progress badge now centered
  * Animated progress bar is now optional
  * Configuration data is now stored using electron-config package
  * Minimum window width increased to avoid horizontal scroll
  * Overall style slightly improved
  * Fallback to default config if corrupted file
  * CONTRIBUTIONS.md renamed to CONTRIBUTING.md

0.2.4 / 2017-08-01
==================

  * Removed custom window frame, and replaced by OS default frame, several related bugs solved
  * Sudo commands now supported by converting sudo to pkexec
  * Task progress icon changed into a loading spinner
  * Added About menu
  * Materialize-css updated to 0.99 and jqeury-ui added
  * Remove configuration files from final build
  * Added CONTRIBUTIONS.md file

0.2.3 / 2017-07-08
==================

  * Using tile (~) in the path is now supported
  * Increased navbar menu width
  * Changed navbar menu elements text
  * Electron post-install bug fixed, removed patch
  * Materialize-css and electron dependencies updated
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
