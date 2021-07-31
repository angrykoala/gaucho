---
sidebar_position: 1
---

# Installation
:::caution
Gaucho is only available for amd64bit systems, you may need to [build Gaucho from source code](/docs/advanced-guides/build-from-source) if your system is not available
:::

Before installing Gaucho, you will need to [download](/download) a version suitable for your system.

## Linux
There are several options available to install Gaucho in Linux systems:

* A `zip` folder containing a binary file along with all the required files to execute directly in Linux systems
* `.deb` file for Debian and Ubuntu systems. You can install the package using a suitable installer or running   
  `sudo apt install ./gaucho.deb`.
* An [AppImage](https://appimage.org/) file that can be executed directly or installed in multiple Linux systems
* A `.snap` file for Ubuntu-based systems. If you plan on installing the snap version, please follow the instructions below.


### Installing Snap
Gaucho is published in the [Snap Store](https://snapcraft.io) and can be downloaded and installed directly.

**From the Ubuntu Store**   
Go to the Ubuntu Software Store and search for "Gaucho". Then click on "install".

![Ubuntu Store Gaucho](/img/docs/ubuntu_store.png)


**Using Snap**   
You can install the snap version of Gaucho using the terminal instead:
```sh
snap install gaucho
```

## Windows
You can run Gaucho directly as a portable `gaucho.x.x.x.exe` file, no installation required.

Alternatively, you can execute the installer `gauchoSetup.x.x.x.exe`. The installer will guide you through the process.

## Mac
The compressed folder contains the standalone app to be executed or installed in mac. An invalid certificate warning may appear.
