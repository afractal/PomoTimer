import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { Timer } from 'sharp-timer';
import { Commands } from './types/command-defs';
import { EventEmitter } from 'events';
import { Messages } from './types/messages';

type Action = () => void;

export class TimerComponent extends EventEmitter {
    private readonly statusBarClock: StatusBarItem;
    private readonly statusBarAction: StatusBarItem;
    private timer: Timer;

    constructor(private readonly startTimerInMinutes: number) {
        super();
        this._isRunning = false;
        this.statusBarClock = window.createStatusBarItem(StatusBarAlignment.Right, 2);
        this.statusBarAction = window.createStatusBarItem(StatusBarAlignment.Right, 3);
        this.initTimer();
    }

    private _isRunning: boolean;

    displayTimer() {
        this.statusBarClock.show();
        this.statusBarAction.show();
    }

    startTimer() {
        if (this._isRunning) return;

        this._isRunning = true;
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
        this._isRunning = false;
        this.initTimer();
    }

    hideTimer() {
        this.statusBarAction.hide();
        this.statusBarClock.hide();
    }

    private initTimer() {
        this.timer = new Timer(this.startTimerInMinutes * 60);
        this.statusBarAction.command = Commands.StartTimer;
        this.statusBarAction.text = '$(triangle-right)';
        this.statusBarAction.tooltip = 'Start timer';
        this.statusBarClock.text = `${this.timer.toString()}`;

        this.timer.onIntervalElapsing((r: number) => {
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
