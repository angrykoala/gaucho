# Schedule Tasks
Instead of running tasks when the "Run" button is pressed, tasks can be run after some time has passed.

To schedule a task to run after a certain time:
1. Right-click on the task name to display the context menu.
2. Select **"Schedule"**.
3. In the dialog that appears, select the hours, minutes and seconds until the task is executed.

![Schedule Task Dialog](/img/docs/schedule_task.png)

4. Click "Schedule".
5. A timer will appear next to the task run button. When the timer hits 0, the task will be run.

![Task Timer](/img/docs/task_timer.png)

:::tip
Task timer can be hidden in [Settings](/docs/features/settings#display).
:::

## Schedule a suite
You can also schedule a whole suite through its [context menu](/docs/features/suites#context-menu).
This will schedule all tasks in the suite.

## Repeat mode
In the schedule dialog, selecting the option **"repeat"** will execute tasks repeatedly once the timer hits 0 and the task finish. This allows to execute a task every n seconds.

![Schedule Task Dialog Repeat](/img/docs/schedule_task_repeat.png)

:::caution
Schedule tasks with repeat will only trigger the time **after** the task has finished. The timer also has a +-1 second error, meaning that repeat scheduling is not reliable for tasks that need to happen **exactly** every n seconds. Use [Cron](https://en.wikipedia.org/wiki/Cron) or similar tools instead.
:::
