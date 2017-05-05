import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { ITimer } from '../src/interfaces/timer.interface';

export class Timer implements ITimer {
    private _intervalElapsedEvents = [];
    constructor(readonly remainingMinutes = 0, readonly remainingSeconds: number = 0) {
        this.setInitalTimer();
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        this.statusBarItem.color = 'white';
    }

    private _intervalId: NodeJS.Timer;
    public get intervalId(): NodeJS.Timer { return this._intervalId; }
    public set intervalId(value: NodeJS.Timer) { this._intervalId = value; }

    private _time: string;
    get time(): string { return this._time; }
    set time(value: string) {
        if (value && value !== this._time) {
            this._time = value;
            for (const intervalElapsedEvent of this._intervalElapsedEvents) {
                intervalElapsedEvent(this._time);
            }
        }
    }

    private _statusBarItem: StatusBarItem;
    get statusBarItem() { return this._statusBarItem; }
    set statusBarItem(value: StatusBarItem) { this._statusBarItem = value; }

    displayTimer(startCommand: string) {
        this.setInitalTimer();
        this.statusBarItem.command = startCommand;
        this.statusBarItem.tooltip = 'Start timer';
        this.statusBarItem.text = `$(triangle-right)  ${this.time}`;
        this.statusBarItem.show();
    }

    hideTimer() {
        this.statusBarItem.hide();
        clearInterval(this.intervalId);
    }

    startTimer(finishCommand: string, durationInMinutes?: number) {
        this.setInitalTimer();
        this.statusBarItem.command = finishCommand;
        this.statusBarItem.tooltip = 'Stop timer';

        let endTime = new Date();
        endTime.setMinutes(endTime.getUTCMinutes() + (durationInMinutes || this.remainingMinutes));

        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            const now = Date.now();
            const diffMinutes = new Date((+endTime) - now).getMinutes();
            const diffSeconds = new Date((+endTime) - now).getSeconds();
            this.time = `${this.getDoubleDigit(diffMinutes)}:${this.getDoubleDigit(diffSeconds)}`;
            this.statusBarItem.text = `$(primitive-square)  ${this.time}`;
        }, 1000);
    }

    finishTimer(startCommand: string) {
        this.statusBarItem.command = startCommand;
        this.statusBarItem.text = `$(sync)  ${this.time}`;
        this.statusBarItem.tooltip = 'Restart timer';
        clearInterval(this.intervalId);
    }

    interruptTimer() {
        throw new Error("Not Implemented");
    }

    timerStoppedHandler(startCommand: string, str: string) {
        if (str === '00:00') {
            this.setInitalTimer();
            this.statusBarItem.tooltip = 'Start timer';
            this.statusBarItem.command = startCommand;
            clearInterval(this.intervalId);
            setTimeout(() => {
                this.statusBarItem.text = `$(triangle-right)  ${this.time}`;
            }, 4);
            window.showInformationMessage('Time for a break');
        }
    }

    // events
    onIntervalElapsed(handler) {
        this._intervalElapsedEvents.push(handler);
    }

    // privates
    setInitalTimer() {
        const mins = this.getDoubleDigit(this.remainingMinutes);
        const seconds = this.getDoubleDigit(this.remainingSeconds);
        this.time = `${mins}:${seconds}`;
    }

    getDoubleDigit(number: number) {
        const filledNumber = '0' + number.toString();
        return filledNumber.length >= 3 ? filledNumber.slice(1, filledNumber.length) : filledNumber;
    }
}