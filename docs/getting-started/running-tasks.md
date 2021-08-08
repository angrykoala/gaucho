---
sidebar_position: 3
---

# Running Tasks

## Run/Stop tasks

Once the tasks are configured, you can execute them with the _"Run"_ button.
The _"Run"_ button will **not** be visible in [Edit Mode](docs/getting-started/creating-tasks#edit-mode).
Gaucho can run multiple tasks at the same time.

![Run button](/img/docs/run_button.png)

While running, the timer will appear, indicating the running time. The _"Run"_ button will turn into the _"Stop"_ button. Tasks will keep running while in [edit mode](/docs/getting-started/creating-tasks#edit-mode).

![Stop button and timer](/img/docs/task_running.png)

:::caution
A task will be stopped immediately, sending a kill signal. If you close Gaucho, all tasks will be stopped.
:::

## Task output

At any time, (while not in _"Edit Mode"_) you can click on any task name to see the terminal output (`stdout` and `stderr`). The output is updated in real-time while the tasks is running.

The output will be cleared when running a task again.

![Task Output](/img/docs/task_output.png)

:::note
The output will display colors and you can scroll to see the full output.
:::

## Task status

Each task status is displayed with an icon on the right:

* ![Status Ok](/img/docs/status_idle.png) **Idle**: The task has not been executed or it has been stopped.
* ![Status Ok](/img/docs/status_ok.png) **OK**: The task finished successfully.
* ![Status Ok](/img/docs/status_running.png) **Running**: The task is still running.
* ![Status Ok](/img/docs/status_error.png) **Error**: The task failed or returned an error.


## Context menu
By right-clicking on a task, a contextual menu will appear. This menu allows you to perform several actions.

![Task Context Menu](/img/docs/task_context_menu.png)

* **Run/Stop**: The option _"Run"_ or _"Stop"_ will [run or stop](#runstop-tasks) the task. These options are available at any time.
* **Schedule**: With the schedule option, the tasks can be set to run at a certain time. Check [Schedule Tasks](/docs/features/schedule-tasks) for more info.
* **Delete**: Will delete the task. This option is available anytime.
* **Duplicate**: This option will create an identical task with a different name below the original. This new task can then be modified, moved or executed along with the original.
