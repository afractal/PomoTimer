import { registerTimerEvents } from "../timer-utils";
import { UnStartedTimer } from "./unstarted-timer";
import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimer, TimerStates } from "../../types";
import { Timer } from "sharp-timer";
import * as Config from "../../services/configuration";

export class ElapsedTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    getState(): TimerStates {
        return 'elapsed'
    }

    restart() {
        this.timerObj.timer.stop();
        registerTimerEvents(this.timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        return new UnStartedTimer(this.timerObj);
    }

    display() {
        this.timerObj.statusBarAction.show();
        this.timerObj.statusBarClock.show();
        return this;
    }


    start: () => this;
    pause: () => this;
    resume: () => this;

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}
