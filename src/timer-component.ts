import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { Timer } from 'sharp-timer';

export class TimerComponent {
    constructor(readonly startTimeInMinutes: number, startCommand: string, restartCommand: string) {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        this.initTimer(startCommand, restartCommand);
    }

    private _statusBarItem: StatusBarItem;
    get statusBarItem() { return this._statusBarItem; }
    set statusBarItem(value) { this._statusBarItem = value; }

    private _timer: Timer;
    get timer() { return this._timer; }
    set timer(value) { this._timer = value }

    displayTimer() {
        this.statusBarItem.show();
    }

    startTimer(pauseCommand: string) {
        this.timer.start();
        this.statusBarItem.command = pauseCommand;
        this.statusBarItem.tooltip = 'Pause timer';
    }

    pauseTimer(resumeCommand: string) {
        this.timer.pause();
        this.statusBarItem.command = resumeCommand;
        this.statusBarItem.tooltip = 'Start timer';
        this.statusBarItem.text = `$(triangle-right)  ${this.timer.toString()}`;
    }

    resumeTimer(pauseCommand: string) {
        this.timer.resume();
        this.statusBarItem.command = pauseCommand;
        this.statusBarItem.tooltip = 'Pause timer';
    }

    restartTimer(startCommand: string, restartCommand: string) {
        this.initTimer(startCommand, restartCommand);
    }

    hideTimer() {
        this.statusBarItem.hide();
    }

    private initTimer(startCommand: string, restartCommand: string) {
        this.timer = new Timer(this.startTimeInMinutes * 60);
        this.statusBarItem.text = `$(triangle-right)  ${this.timer.toString()}`;
        this.statusBarItem.command = startCommand;
        this.statusBarItem.tooltip = 'Start timer';

        this.timer.onIntervalElapsing(r => {
            this.statusBarItem.text = `$(primitive-square)  ${this.timer.toString()}`;
        });
        this.timer.onIntervalElapsed(() => {
            this.statusBarItem.command = restartCommand;
            this.statusBarItem.text = `$(sync)  ${this.timer.toString()}`;
            this.statusBarItem.tooltip = 'Restart timer';
            this.timer.stop();
            this.timer = null;
            window.showInformationMessage('Time for a break');
        });
    }
}
