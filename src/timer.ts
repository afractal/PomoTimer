import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { TimerState } from './timer-state';

export class Timer {
    constructor(state: TimerState, remainingMinutes: number = 0, remainingSeconds: number = 0) {
        const mins = getDoubleDigitRepresentation(remainingMinutes);
        const seconds = getDoubleDigitRepresentation(remainingSeconds);
        this.time = `${mins}:${seconds}`;
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        this.statusBarItem.color = 'white';
    }

    private _time: string;
    get time(): string { return this._time; }
    set time(value: string) { this._time = value; }

    private _statusBarItem: StatusBarItem;
    get statusBarItem() { return this._statusBarItem; }
    set statusBarItem(value: StatusBarItem) { this._statusBarItem = value; }

    displayTimer(afterCommand: string) {
        this.statusBarItem.text = `$(triangle-right)  ${this.time}`;
        this.statusBarItem.command = afterCommand;
        this.statusBarItem.tooltip = 'Start timer';
        this.statusBarItem.show();
    }

    startTimer() {
        const startTime = new Date();
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 20);

        while (new Date() <= endTime) {
            const diffMinutes = Math.abs(endTime.getMinutes() - new Date().getMinutes());
            const diffSeconds = Math.abs(endTime.getSeconds() - new Date().getSeconds());

            console.log(diffMinutes, 'diffMinutes')
            console.log(diffSeconds, 'diffSeconds')
            //     this.time = `${diffMinutes}:${diffSeconds}`;
            //     this.statusBarItem.text = `$(primitive-square)  ${this.time}`;
            //     this.statusBarItem.tooltip = 'Stop timer';
        }
    }

    finishTimer() {
        throw "Not Implemented";
    }

    interruptTimer() {
        throw "Not Implemented";
    }
}


function getDoubleDigitRepresentation(num: number) {
    const added = '0' + num.toString();
    if (added.length >= 3) {
        return added.slice(1, added.length - 1);
    }
    else {
        return added;
    }
}