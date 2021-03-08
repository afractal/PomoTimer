# PomoTimer

[![CircleCI](https://circleci.com/gh/afractal/PomoTimer.svg?style=svg)](https://circleci.com/gh/afractal/PomoTimer)
[![Version](https://vsmarketplacebadge.apphb.com/version/afractal.pomotimer.svg)](https://marketplace.visualstudio.com/items?itemName=afractal.pomotimer)

![demo](https://raw.githubusercontent.com/afractal/PomoTimer/master/assets/example.gif)

## Keybindings

| command                           | mac             | win              |
| --------------------------------- | --------------- | ---------------- |
| Display Taskboard                 | cmd+alt+t       | ctrl+alt+t       |
| Display/Hide Pomodoro Timer       | cmd+alt+d       | ctrl+alt+d       |
| Start/Pause/Resume Pomodoro Timer | cmd+alt+s       | ctrl+alt+s       |
| Restart Pomodoro Timer            | cmd+alt+shift+r | ctrl+alt+shift+r |

## Configuration

You can configure the duration of a pomodoro and the duration of the break for the timer by setting the configuration like the example below, the default for workTime is **25** minutes and the default for breakTime is **5**.

```
{
    "pomotimer.workTime": 30,
    "pomotimer.breakTime": 5
}
```

## Changes

*v.0.4*

- security updates
- improve footprints of the app
- remove unnecessary ci's

*v.0.3*

- add adjustable break timer
- add reset task feature
- display/hide are condensed to one command
- start/stop/resume are condensed to one command
- every reset should pull work time from settings
- revisit timer mechanisms

*v.0.2*

- add and integrate taskboard with timer
- add pomodori counter for tasks
- bug on hiding/displaying timer
- bug on removing the current task, it should be removed from the timer

*v0.1*

- add basic pomodoro timer functionality

## Credits

Credits to [icons8](https://icons8.com/) for the tomato logo, under the [Creative Commons Attribution-NoDerivs 3.0 Unported](https://icons8.com/license/) licence.

## License

The source code for this extension is licensed under the [MIT](./LICENSE.md) license.

---

<p align="center">
    made with :heart: by <a href="https://github.com/afractal">me</a>
</p>
