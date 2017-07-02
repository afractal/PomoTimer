
// export enum Commands {
//     DisplayTimer = 'pomotimer.displayTimer',
//     StartTimer = 'pomotimer.startTimer',
//     StartTimer = 'pomotimer.startTimer',
//     ResumeTimer = 'pomotimer.resumeTimer',
//     RestartTimer = 'pomotimer.restartTimer',
//     HideTimer = 'pomotimer.hideTimer'
// }

export type Commands =
    | 'pomotimer.displayTimer'
    | 'pomotimer.startTimer'
    | 'pomotimer.pauseTimer'
    | 'pomotimer.resumeTimer'
    | 'pomotimer.restartTimer'
    | 'pomotimer.hideTimer'
