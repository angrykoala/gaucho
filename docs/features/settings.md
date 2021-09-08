---
sidebar_position: 2
---

# Settings
Gaucho has some options and actions in the _"Settings"_ menu; you can access this menu by clicking on the _"Settings"_ option in the main main or the context menu.

![Settings](/img/docs/gaucho_settings.png)

## Display
In display options, you can customize Gaucho interface.

* **Bottom Bar**: Display the bottom bar with information about running and total tasks.
* **Show Timer**: Display each task execution time.

### Themes
Gaucho has 3 themes to choose from:

* **Classic** (default)
* **Light**
* **Dark**


![Themes](/img/docs/themes.png)

You can create custom themes by following the instructions in [Custom Themes](/docs/advanced-guides/custom-themes) and [Rebuilding Gaucho](/docs/advanced-guides/build-from-source).

## Actions
The following actions can be performed from the buttons in the _"settings"_ menu:

* Reset Settings to the default values.
* Export/Import tasks and suites. Check [Export Tasks](/docs/features/export-tasks) for more details.
* Clear Tasks. This will completely remove every task and suite you have in Gaucho.

## Global environment variables
You can configure global [environment variables](/docs/features/env-variables) for all your tasks here. Variables defined on each task will have **more** priority than global variables.

![Global Env Variables](/img/docs/global_env_variables.png)
