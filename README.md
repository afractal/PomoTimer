# PomoTimer

[![Version](https://vsmarketplacebadge.apphb.com/version/afractal.pomotimer.svg)](https://marketplace.visualstudio.com/items?itemName=afractal.pomotimer)
[![Build Status](https://travis-ci.org/afractal/PomoTimer.svg?branch=master)](https://travis-ci.org/afractal/PomoTimer)
[![Build status](https://ci.appveyor.com/api/projects/status/fqnva71t73fotv23/branch/master?svg=true)](https://ci.appveyor.com/project/hermesxgjini/pomotimer/branch/master)

![demo](https://raw.githubusercontent.com/afractal/PomoTimer/master/assets/example.gif)

## Changes

*v.0.3.\**

- display/hide are condensed to one command
- start/stop/resume are condensed to one command
- revisit mechanisms

*v.0.2.\**

- add and integrate taskboard with timer
- add pomodori counter for tasks
- bug on hiding/displaying timer
- bug on removing the current task, it should be removed from the timer

*v0.1.\**

- add basic pomodoro timer functionality


## Keybindings

command                             | mac                | win
----------------------------------- | ------------------ | ---------------
Display Taskboard                   | cmd+alt+t          | ctrl+alt+t
Display/Hide Pomodoro Timer         | cmd+alt+d          | ctrl+alt+d
Start/Pause/Resume Pomodoro Timer   | cmd+alt+s          | ctrl+alt+s
Restart Pomodoro Timer              | cmd+alt+shift+r    | ctrl+alt+shift+r


## Configuration

You can configure the duration of a pomodoro for the timer by setting the configuration like the example below, the default is **25** minutes.

```
{
    "pomotimer.workTime": 20
}
```

## Credits

Credits to [icons8](https://icons8.com/) for the tomato logo, under the [Creative Commons Attribution-NoDerivs 3.0 Unported](https://icons8.com/license/) licence.

## License

The source code for this extension is licensed under the [MIT](./LICENSE.md) license.
