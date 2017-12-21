import { registerTimerEvents } from "../timer-utils";
import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimer, TimerStates } from "../../types";

export class UnStartedTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) {
        registerTimerEvents(this.timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
    }

    getState(): TimerStates { return 'unstarted'; }

    display() {
        this.timerObj.statusBarAction.show()
        this.timerObj.statusBarClock.show();
        return this;
    }

    start() {
        this.timerObj.timer.start();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    pause: () => this;
    resume: () => this;
    restart: () => this;

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}
