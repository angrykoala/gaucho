# Env Variables
Environment variables can be set for each task, or globally. By default, your own system usual env variables will be set when running
a task, but extra variables can be added or overridden.

## Adding env variables to a task
While in [Edit Mode](/docs/getting-started/creating-tasks#edit-mode) the section _"Env Variables"_ in a task configuration menu can be clicked to display the env variables editor.

![Task Env Variables](/img/docs/task_env_variables.png)

This editor will take pairs KEY-VALUE, with an env variable being in each row. Clicking on the _"x"_ will delete the variable.
If a variable already exists in the [global env variable list](#global-env-variables) or in your system it will be overridden. Click save to update your task configuration and the env variables for that task.

You **cannot** add multiple variables with the same KEY.

## Global env variables
Env variables can be set to be used on **all** tasks. These can be configured in [settings](/docs/features/settings#global-environment-variables)


:::note
Neither task or global env variables will change your system variables These variables are **only** used within Gaucho.
:::
