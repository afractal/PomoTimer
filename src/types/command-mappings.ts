export enum CommandMappingsEnum {
    DisplayTimer = 'pomotimer.displayTimer',
    StartTimer = 'pomotimer.startTimer',
    PauseTimer = 'pomotimer.pauseTimer',
    ResumeTimer = 'pomotimer.resumeTimer',
    RestartTimer = 'pomotimer.restartTimer',
    HideTimer = 'pomotimer.hideTimer',
    DisplayTaskboard = 'pomotimer.displayTaskboard'
}

type CommandCallback = (...args: any[]) => any;

export type CommandMappings = {
    'pomotimer.displayTimer': CommandCallback,
    'pomotimer.startTimer': CommandCallback,
    'pomotimer.pauseTimer': CommandCallback,
    'pomotimer.resumeTimer': CommandCallback,
    'pomotimer.restartTimer': CommandCallback,
    'pomotimer.hideTimer': CommandCallback,
    'pomotimer.displayTaskboard': CommandCallback
};
