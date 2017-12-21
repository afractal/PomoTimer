import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimer, TimerStates } from "../../types";

export class PausedTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    getState(): TimerStates { return 'paused'; }

    resume() {
        this.timerObj.timer.resume();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    display() {
        this.timerObj.statusBarAction.show();
        this.timerObj.statusBarClock.show();
        return this;
    }

    start: () => this;
    pause: () => this;
    restart: () => this;

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}
