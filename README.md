# Codebattle Chrome extension
[![Build Status](https://travis-ci.org/hexlet-codebattle/battle_chrome_extension.svg?branch=master)](https://travis-ci.org/hexlet-codebattle/battle_chrome_extension)

## Description:

Chrome extension for hexlet-codebattle

## Requirements:

- node + npm

## Setup:

```
make
```


## Install the extension:
- Go to ```chrome://extensions/```
- Check that you've turned on the "Developer Mode" (the checkbox at the top right)

 
__Usage in develop-environment:__
 
- Select "Load unpacked...".
- Select ```dev``` folder in the extension root (if it is not there, first do the next step)
- Launch the server by running ```make develop``` in the terminal. The server must be kept running continuously
- If you change the js-files, the extension will be updated automatically. To apply changes to the ```manifest.json```, the server must be restarted

__Install the release version:__

- Drag the extension archive from the ```dist``` folder into the browser window
- Accept the installation

_Or_

- Select "Load unpacked...";
- Select ```build``` folder in the extension root
