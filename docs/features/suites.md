---
sidebar_position: 1
---

# Suites
Tasks are grouped in **Suites** that allow you to organize your tasks and run them in batch.
Suites are always visible on the top bar as tabs:

![Suites Tabs](/img/docs/suites_tabs.png)

You can change suites by selecting the tab. All running tasks will keep running when changing tabs.

## Creating suites
While in [Edit Mode](/docs/getting-started/creating-tasks#edit-mode), a "+" tab will appear next to your suites. Clicking the "+" tab will create a new suite.

![Add Suite Button](/img/docs/suite_add.png)

:::note
Gaucho supports up to 6 suites.
:::

To rename a newly created suite, follow the instructions in [Renaming suites](#renaming-suites)

## Delete a suite
To delete a suite, and **all** its tasks:
1. Go to [Edit Mode](/docs/getting-started/creating-tasks#edit-mode)
2. Select the suite you wish to delete.
3. Click the "x" that appears in the selected suite tab.   
![Delete Suite](/img/docs/delete_suite.png)
4. A dialog will appear asking you to confirm.

:::tip Pro-tip
Alternatively you can delete a suite at any time through the [Context Menu](#context-menu)
:::

## Reordering suites
While in [Edit Mode](/docs/getting-started/creating-tasks#edit-mode), suite tabs can be dragged to reorder. Suites will keep the same tasks, only the order in the tabs will change.

### Moving tasks between suites
When [moving tasks](/docs/getting-started/creating-tasks#edit-mode). If the task is moved to a tab of a different suite, it will be sleected, allowing you to move tasks between suites.

## Context Menu
The context menu can be accessed by right-clicking in a suite tab. This menu has several context-specific actions for suites.

![Suite Context Menu](/img/docs/suite_context_menu.png)

### Run/Stop suite
With the option _"Run Suite"_ you can run **all** the tasks in a suite. All tasks will begin concurrently. If a task is already running it will keep running, but it will not be relaunched.

Likewise, all the tasks in a suite can be stopped with the _"Stop Suite"_ option. This will immediately [stop](/docs/getting-started/running-tasks#runstop-tasks) any running tasks in the suite.

### Schedule
With the schedule option, **all** tasks in the suite can be scheduled to run at the same time. Check [Schedule Tasks](/docs/features/schedule-tasks) for more info.

### Renaming suites
At any time, you can rename a suite:
1. Right-click the suite tab to show the [contextual menu](#context-menu).
2. Select "Rename".
3. In the new window, type the new name and click "Rename".   
![Rename Suite Modal](/img/docs/rename_suite.png)

### Export suite
Task in a suite can be exported to a `.json` file, as described [here](/docs/features/export-tasks#export-suite).

### Duplicate suite
Like tasks, suites can be duplicated, this will create a new suite with the same tasks as the previous one.
