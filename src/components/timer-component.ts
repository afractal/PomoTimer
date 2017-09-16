import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { Timer } from 'sharp-timer';
import { Commands } from '../types/command-defs';
import { EventEmitter } from 'events';
import { Messages } from '../types/messages';

/*
    initial state -> can only start
    running state -> can pause and restart
    paused state -> can start and restart
*/

interface ITimerComponent { }

class UnStartedTimerComponent implements ITimerComponent { }
class RunningTimerComponent implements ITimerComponent { }
class PausedTimerComponent implements ITimerComponent { }


export class TimerComponent extends EventEmitter {
    private readonly statusBarClock: StatusBarItem;
    private readonly statusBarAction: StatusBarItem;
    private readonly pomodoroSizeInMinutes: number;
    private timer: Timer;
    private isRunning: boolean;

    constructor(pomodoroSizeInMinutes: number) {
        super();
        this.isRunning = false;
        this.pomodoroSizeInMinutes = pomodoroSizeInMinutes;
        this.statusBarClock = window.createStatusBarItem(StatusBarAlignment.Right, 2);
        this.statusBarAction = window.createStatusBarItem(StatusBarAlignment.Right, 3);
        this.initializeTimer();
    }

    displayTimer() {
        this.statusBarClock.show();
        this.statusBarAction.show();
    }

    startTimer() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.timer.start();
        this.statusBarAction.command = Commands.PauseTimer;
        this.statusBarAction.tooltip = 'Pause timer';
    }

    pauseTimer() {
        this.timer.pause();
        this.statusBarAction.command = Commands.ResumeTimer;
        this.statusBarAction.tooltip = 'Start timer';
        this.statusBarAction.text = '$(triangle-right)';
        this.statusBarClock.text = `${this.timer.toString()}`;
    }

    resumeTimer() {
        this.timer.resume();
        this.statusBarAction.command = Commands.PauseTimer;
        this.statusBarAction.tooltip = 'Pause timer';
    }

    restartTimer() {
        this.timer.stop();
        this.isRunning = false;
        this.initializeTimer();
    }

    hideTimer() {
        this.statusBarAction.hide();
        this.statusBarClock.hide();
    }

    private initializeTimer() {
        this.timer = new Timer(this.pomodoroSizeInMinutes * 60);
        this.statusBarAction.command = Commands.StartTimer;
        this.statusBarAction.text = '$(triangle-right)';
        this.statusBarAction.tooltip = 'Start timer';
        this.statusBarClock.text = `${this.timer.toString()}`;

        this.timer.onIntervalElapsing((_: number) => {
            this.statusBarAction.text = '$(primitive-square)';
            this.statusBarClock.text = `${this.timer.toString()}`;
            this.emit(Messages.TimerElapsing);
        });

        this.timer.onIntervalElapsed(() => {
            this.statusBarAction.command = Commands.RestartTimer;
            this.statusBarAction.text = '$(sync)';
            this.statusBarAction.tooltip = 'Restart timer';
            this.statusBarClock.text = `${this.timer.toString()}`;
            this.timer.stop();
            this.emit(Messages.TimerElapsed);
        });
    }
}
