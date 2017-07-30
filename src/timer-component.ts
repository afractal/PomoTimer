import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { Timer } from 'sharp-timer';

export class TimerComponent {
    constructor(readonly startTimeInMinutes: number, startCommand: Commands, restartCommand: Commands) {
        this._selectedTask = null;
        this.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        this.statusBarClock = window.createStatusBarItem(StatusBarAlignment.Right, 2);
        this.statusBarAction = window.createStatusBarItem(StatusBarAlignment.Right, 3);
        this.initTimer(startCommand, restartCommand);
    }

    private _statusBarClock: StatusBarItem;
    get statusBarClock() { return this._statusBarClock; }
    set statusBarClock(value) { this._statusBarClock = value; }

    private _statusBarAction: StatusBarItem;
    get statusBarAction() { return this._statusBarAction; }
    set statusBarAction(value) { this._statusBarAction = value; }

    private _statusBarSelectedTask: StatusBarItem;
    get statusBarSelectedTask() { return this._statusBarSelectedTask; }
    set statusBarSelectedTask(value) { this._statusBarSelectedTask = value; }

    private _timer: Timer;
    get timer() { return this._timer; }
    set timer(value) { this._timer = value }

    private _selectedTask: string | null;
    get selectedTask() { return this._selectedTask; }

    displayTimer() {
        this.statusBarClock.show();
        this.statusBarAction.show();
        if (this._selectedTask) {
            this.statusBarSelectedTask.show();
        }
    }

    startTimer(pauseCommand: Commands) {
        this.timer.start();
        this.statusBarAction.command = pauseCommand;
        this.statusBarAction.tooltip = 'Pause timer';
    }

    pauseTimer(resumeCommand: Commands) {
        this.timer.pause();
        this.statusBarAction.command = resumeCommand;
        this.statusBarAction.tooltip = 'Start timer';
        this.statusBarAction.text = '$(triangle-right)';
        this.statusBarClock.text = `${this.timer.toString()}`;
    }

    resumeTimer(pauseCommand: Commands) {
        this.timer.resume();
        this.statusBarAction.command = pauseCommand;
        this.statusBarAction.tooltip = 'Pause timer';
    }

    restartTimer(startCommand: Commands, restartCommand: Commands) {
        this.initTimer(startCommand, restartCommand);
    }

    hideTimer() {
        this.statusBarAction.hide();
        this.statusBarClock.hide();
    }

    setWorkingTask(displayTaskboardCommand: Commands, selectedTask: string) {
        this.statusBarSelectedTask.text = this._selectedTask = selectedTask;
        this.statusBarSelectedTask.command = displayTaskboardCommand;
        this.statusBarSelectedTask.tooltip = 'Current working task';
        this.statusBarSelectedTask.color = '#bfbfbf';

        this.displayTimer();
    }

    private initTimer(startCommand: Commands, restartCommand: Commands) {
        this.timer = new Timer(this.startTimeInMinutes * 60);
        this.statusBarAction.command = startCommand;
        this.statusBarAction.text = '$(triangle-right)';
        this.statusBarAction.tooltip = 'Start timer';
        this.statusBarClock.text = `${this.timer.toString()}`;

        this.timer.onIntervalElapsing((r: number) => {
            this.statusBarAction.text = '$(primitive-square)';
            this.statusBarClock.text = `${this.timer.toString()}`;
        });
        this.timer.onIntervalElapsed(() => {
            this.statusBarAction.command = restartCommand;
            this.statusBarAction.text = '$(sync)';
            this.statusBarAction.tooltip = 'Restart timer';
            this.statusBarClock.text = `${this.timer.toString()}`;
            this.timer.stop();
            window.showInformationMessage('Time for a break');
        });
    }
}
