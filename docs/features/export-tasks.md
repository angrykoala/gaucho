
# Export Tasks

All your tasks can be exported into a `.json` file, this file can be then imported to Gaucho, this is useful for backup,
syncing or sharing tasks.

:::caution
Note that exporting will **only** export tasks, suites and [global env variables](/docs/features/env-variables#global-env-variables) it won't export your [settings](/docs/features/settings).
:::

## Export all tasks
To export all tasks and suites into a file (e.g for a backup):

1. Go to [settings->actions](/docs/features/settings#actions)
2. Click on **Export tasks**.   
![Export Tasks Button](/img/docs/export_tasks.png)
3. A dialog will appear asking you to save a file in your system. This file will contain all tasks, suites and global env in [JSON format](#file-format).

### Import all tasks
This process will remove **all** tasks, suites and global env variables, and load those in a file previously exported. To do this:

1. Go to [settings->actions](/docs/features/settings#actions)
2. Click on **Import tasks**.   
![Import Tasks Button](/img/docs/import_tasks.png)
3. A dialog will appear asking you to select a file in your system. This file should contains all tasks, suites and global env in [JSON format](#file-format).


:::tip
If the file is not valid, or there is a problem. Tasks won't be loaded and existing tasks will be kept.
:::

## Export suite
Instead of exporting all the tasks, a single suite can be exported into a file:
1. Right-click into the suite name.
2. In the context menu, select **"Export"**.
3. A dialog asking you to save a file will appear.

### Import suite
To import a suite:

1. Go to [settings->actions](/docs/features/settings#actions)
2. Click on **Import suite**.   
![Import Suite Button](/img/docs/import_suite.png)
3. A dialog will appear asking you to select a file in your system.
4. The new suite will be available with all its tasks.


:::tip
To import a suite you must have less than the maximum number of suites (6 by default).
:::

## File format
Regardless of what you export (all tasks or a single suite), the resulting file is going to be a [JSON](https://en.wikipedia.org/wiki/JSON) file with the following fields:

* **suites**: An array of suites each item containing an object representing a [suite](/docs/features/suites).
  * **title**: The name of the suite.
  * **tasks**: An array containing the objects representing each [task](/docs/getting-started/creating-tasks#create-a-new-task).
    * **title**: The task name
    * **command**: The task command or script
    * **env** (_optional_): Array containing pairs (array) of key-value for each [env variable](/docs/features/env-variables).
    * **path** (_optional_): Path of the task
* **version**: The version of Gaucho app that exported the tasks.
* **globalEnv** (_optional_): An array of pairs representing the [global env variables](/docs/features/env-variables#global-env-variables)

:::tip
While not recommended, it is possible to manually create or edit these files.
:::

### Examples

A file exporting **all** tasks:
```json title="tasks.json"
{
  "suites": [{
    "title": "Suite 1",
    "tasks": [{
      "title": "Task 1",
      "command": "echo hello"
    }, {
      "title": "Another task",
      "command": "ls",
      "env": [
        ["testvar", "value"]
      ],
      "path": "~"
    }]
  }, {
    "title": "another suite",
    "tasks": [{
      "title": "sleep",
      "command": "sleep"
    }]
  }],
  "version": "1.0.0",
  "globalEnv": [
    ["globalenv", "value"]
  ]
}
```


A file exporting a single suite:
```json title="Suite 1.json"
{
  "suites": [{
    "title": "Suite 1",
    "tasks": [{
      "title": "Task 1",
      "command": "echo hello"
    }, {
      "title": "Another task",
      "command": "ls",
      "env": [
        ["testvar", "value"]
      ],
      "path": "~"
    }]
  }],
  "version": "1.0.0"
}
```

:::note
When exporting tasks, the resulting file will be **minified** to take less space.
:::
