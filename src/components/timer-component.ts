import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { Timer } from 'sharp-timer';
import { EventEmitter } from 'events';
import { CommandMappingsEnum } from '../types/command-mappings';
import { Messages } from '../types/messages';

/*
    initial state -> can only start
    running state -> can pause and restart
    paused state -> can start and restart

type UnstartedTimer = {
    startTimer: Function
}

type RunningTimer = {
    pauseTimer: Function
}

type PausedTimer = {
    resumeTimer: Function
}

type ElapsedTimer = {
    restartTimer: Function
}

type BaseTimer = {
    displayTimer: Function
    hideTimer: Function
}

type TM = UnstartedTimer | RunningTimer | PausedTimer | ElapsedTimer;
*/

type TimerComponent = {
    statusBarClock: StatusBarItem;
    statusBarAction: StatusBarItem;
    pomodoroSizeInMinutes: number;
    timer: Timer;
    isRunning: boolean;
    emitter: EventEmitter;
};

let timerComponent: TimerComponent;

export const init = (pomodoroSizeInMinutes: number) => {
    timerComponent = {
        isRunning: false,
        timer: new Timer(pomodoroSizeInMinutes * 60),
        pomodoroSizeInMinutes: pomodoroSizeInMinutes,
        statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
        statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3),
        emitter: new EventEmitter()
    };
    initializeTimer();
};

export const getEmitter = () => {
    return timerComponent.emitter;
};

export const displayTimer = () => {
    timerComponent.statusBarClock.show();
    timerComponent.statusBarAction.show();
};

export const startTimer = () => {
    if (timerComponent.isRunning) return;

    timerComponent.isRunning = true;
    timerComponent.timer.start();
    timerComponent.statusBarAction.command = CommandMappingsEnum.PauseTimer;
    timerComponent.statusBarAction.tooltip = 'Pause timer';
};

export const pauseTimer = () => {
    timerComponent.timer.pause();
    timerComponent.statusBarAction.command = CommandMappingsEnum.ResumeTimer;
    timerComponent.statusBarAction.tooltip = 'Start timer';
    timerComponent.statusBarAction.text = '$(triangle-right)';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
};

export const resumeTimer = () => {
    timerComponent.timer.resume();
    timerComponent.statusBarAction.command = CommandMappingsEnum.PauseTimer;
    timerComponent.statusBarAction.tooltip = 'Pause timer';
};

export const restartTimer = () => {
    timerComponent.timer.stop();
    timerComponent.isRunning = false;
    initializeTimer();
};

export const hideTimer = () => {
    timerComponent.statusBarAction.hide();
    timerComponent.statusBarClock.hide();
};

const initializeTimer = () => {
    timerComponent.timer = new Timer(timerComponent.pomodoroSizeInMinutes * 60);
    timerComponent.statusBarAction.command = CommandMappingsEnum.StartTimer;
    timerComponent.statusBarAction.text = '$(triangle-right)';
    timerComponent.statusBarAction.tooltip = 'Start timer';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;

    timerComponent.timer.onIntervalElapsing((_: number) => {
        timerComponent.statusBarAction.text = '$(primitive-square)';
        timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
        timerComponent.emitter.emit(Messages.TimerElapsing);
    });

    timerComponent.timer.onIntervalElapsed(() => {
        timerComponent.statusBarAction.command = CommandMappingsEnum.RestartTimer;
        timerComponent.statusBarAction.text = '$(sync)';
        timerComponent.statusBarAction.tooltip = 'Restart timer';
        timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
        timerComponent.timer.stop();
        timerComponent.emitter.emit(Messages.TimerElapsed);
    });
};







// export class TimerComponent extends EventEmitter {
//     private readonly statusBarClock: StatusBarItem;
//     private readonly statusBarAction: StatusBarItem;
//     private readonly pomodoroSizeInMinutes: number;
//     private timer: Timer;
//     private isRunning: boolean;

//     constructor(pomodoroSizeInMinutes: number) {
//         super();
//         this.isRunning = false;
//         this.pomodoroSizeInMinutes = pomodoroSizeInMinutes;
//         this.statusBarClock = window.createStatusBarItem(StatusBarAlignment.Right, 2);
//         this.statusBarAction = window.createStatusBarItem(StatusBarAlignment.Right, 3);
//         this.initializeTimer();
//     }

//     displayTimer() {
//         this.statusBarClock.show();
//         this.statusBarAction.show();
//     }

//     startTimer() {
//         if (this.isRunning) return;

//         this.isRunning = true;
//         this.timer.start();
//         this.statusBarAction.command = CommandMappingsEnum.PauseTimer;
//         this.statusBarAction.tooltip = 'Pause timer';
//     }

//     pauseTimer() {
//         this.timer.pause();
//         this.statusBarAction.command = CommandMappingsEnum.ResumeTimer;
//         this.statusBarAction.tooltip = 'Start timer';
//         this.statusBarAction.text = '$(triangle-right)';
//         this.statusBarClock.text = `${this.timer.toString()}`;
//     }

//     resumeTimer() {
//         this.timer.resume();
//         this.statusBarAction.command = CommandMappingsEnum.PauseTimer;
//         this.statusBarAction.tooltip = 'Pause timer';
//     }

//     restartTimer() {
//         this.timer.stop();
//         this.isRunning = false;
//         this.initializeTimer();
//     }

//     hideTimer() {
//         this.statusBarAction.hide();
//         this.statusBarClock.hide();
//     }

//     private initializeTimer() {
//         this.timer = new Timer(this.pomodoroSizeInMinutes * 60);
//         this.statusBarAction.command = CommandMappingsEnum.StartTimer;
//         this.statusBarAction.text = '$(triangle-right)';
//         this.statusBarAction.tooltip = 'Start timer';
//         this.statusBarClock.text = `${this.timer.toString()}`;

//         this.timer.onIntervalElapsing((_: number) => {
//             this.statusBarAction.text = '$(primitive-square)';
//             this.statusBarClock.text = `${this.timer.toString()}`;
//             this.emit(Messages.TimerElapsing);
//         });

//         this.timer.onIntervalElapsed(() => {
//             this.statusBarAction.command = CommandMappingsEnum.RestartTimer;
//             this.statusBarAction.text = '$(sync)';
//             this.statusBarAction.tooltip = 'Restart timer';
//             this.statusBarClock.text = `${this.timer.toString()}`;
//             this.timer.stop();
//             this.emit(Messages.TimerElapsed);
//         });
//     }
// }
