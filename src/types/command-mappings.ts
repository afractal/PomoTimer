export enum CommandMappingsEnum {
    DisplayTimer = 'pomotimer.displayTimer',
    // StartTimer = 'pomotimer.startTimer',
    // StartBreakTimer = 'pomotimer.startBreakTimer',
    PauseTimer = 'pomotimer.pauseTimer',
    // PauseBreakTimer = 'pomotimer.pauseBreakTimer',
    ResumeTimer = 'pomotimer.resumeTimer',
    RestartTimer = 'pomotimer.restartTimer',
    // RestartBreakTimer = 'pomotimer.restartBreakTimer',
    HideTimer = 'pomotimer.hideTimer',
    DisplayTaskboard = 'pomotimer.displayTaskboard'
};

type CommandCallback = (...args: any[]) => any;

export type CommandMappings = {
    'pomotimer.displayTimer': CommandCallback,
    'pomotimer.startTimer': CommandCallback,
    // 'pomotimer.startBreakTimer': CommandCallback,
    'pomotimer.pauseTimer': CommandCallback,
    // 'pomotimer.pauseBreakTimer': CommandCallback,
    'pomotimer.resumeTimer': CommandCallback,
    'pomotimer.restartTimer': CommandCallback,
    // 'pomotimer.restartBreakTimer': CommandCallback,
    'pomotimer.hideTimer': CommandCallback,
    'pomotimer.displayTaskboard': CommandCallback
};
