export enum CommandMappingsEnum {
    DisplayTimer = 'pomotimer.displayTimer',
    PauseTimer = 'pomotimer.pauseTimer',
    ResumeTimer = 'pomotimer.resumeTimer',
    RestartTimer = 'pomotimer.restartTimer',
    HideTimer = 'pomotimer.hideTimer',
    DisplayTaskboard = 'pomotimer.displayTaskboard'
    // StartTimer = 'pomotimer.startTimer',
    // StartBreakTimer = 'pomotimer.startBreakTimer',
    // PauseBreakTimer = 'pomotimer.pauseBreakTimer',
    // RestartBreakTimer = 'pomotimer.restartBreakTimer',
};

type CommandCallback = (...args: any[]) => any;

export type CommandMappings = {
    'pomotimer.displayTimer': CommandCallback
    'pomotimer.startTimer': CommandCallback
    'pomotimer.pauseTimer': CommandCallback
    'pomotimer.resumeTimer': CommandCallback
    'pomotimer.restartTimer': CommandCallback
    'pomotimer.hideTimer': CommandCallback
    'pomotimer.displayTaskboard': CommandCallback
    // 'pomotimer.startBreakTimer': CommandCallback,
    // 'pomotimer.pauseBreakTimer': CommandCallback,
    // 'pomotimer.restartBreakTimer': CommandCallback,
};
