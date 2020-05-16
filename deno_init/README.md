# deno_init

The executable to set up a deno project 🦕

------

## Installation

This script is meant to be installed with the new `deno_installer`.

Note: the installer is subject to change.  This repo will grow with any updates to deno.

To fetch and install the executable:

```bash
deno_installer deno_init https://raw.githubusercontent.com/maxuuell/deno_init/${b}/mod.ts --allow-net --allow-read --allow-write
```

Note: this script requires network access to fetch a necessary dependency, and read/write access to set up the directory.

Once the executable is installed, run 

```bash
deno_init your_directory
```

