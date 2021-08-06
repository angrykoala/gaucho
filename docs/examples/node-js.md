---
sidebar_position: 2
---

# Node.js
Running servers  or scripts in the background is a common use case for Gaucho. If you are running a [Node.js](https://nodejs.org/en/) server:

:::tip
Remember to update your task path.
:::

## Run project
This tasks assumes your `package.json` is configured with a _"start"_ script.

```sh title="name"
Run server
```

```sh title="command"
npm start
```

```sh title="path"
~/my-project
```

### Using yarn
Alternatively, you can use [yarn](https://yarnpkg.com/)

```sh title="name"
Run server
```

```sh title="command"
npm start
```

```sh title="path"
~/my-project
```

## Running a Node.js script
If you don't have a package.json configured and just want to run a plain Node.js script:

```sh title="name"
Run script.js
```

```sh title="command"
node script.js
```

```sh title="path"
~/my-project
```

## Running tests
If you have tests configured in your project (using `package.json`):

```sh title="name"
Run tests
```

```sh title="command"
npm test
```

```sh title="path"
~/my-project
```

## Download Examples
To download the examples, <a target="_blank" href='/docs/assets/examples/nodejs_examples.json' download>click here</a>   

To load the examples into Gaucho, follow [these instructions](/docs/examples/intro#downloading-examples)
