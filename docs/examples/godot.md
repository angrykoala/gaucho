# Godot

[Godot](https://godotengine.org/) can be run from command line.This means that some tasks can be easily executed from Gaucho.

:::note
These examples assume Godot is installed and accesible to you env, in some cases it may not be available or it may exists with a different name (eg. `godot3`)
:::

## Run scene

```sh title="name"
Run Scene
```

```sh title="command"
godot Scenes/Main.tscn
```

```sh title="path"
~/Godot/my-project
```

## Run tests using Gut
If you have tests using [Gut](https://github.com/bitwes/Gut), you can run them directly in Gaucho.


```sh title="name"
Run Tests (Gut)
```

```sh title="command"
godot --no-window  -s addons/gut/gut_cmdln.gd -d -gdir=res://Tests -glog=1 -gexit -gprefix= -gsuffix=Test.gd -ginclude_subdirs
```

```sh title="path"
~/Godot/my-project
```

## Download Examples
To download the examples, <a target="_blank" href='/docs/assets/examples/godot_examples.json' download>click here</a>   

To load the examples into Gaucho, follow [these instructions](/docs/examples/intro#downloading-examples)
