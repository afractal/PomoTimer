import { registerTimerEvents } from "../timer-utils";
import { UnStartedTimer } from "./unstarted-timer";
import { RunningTimer } from "./running-timer";
import { ITimerState, TimerStates, TimerMode, TimerVisibilityStates, TimerType } from "../../types";
import { Timer } from "sharp-timer";
import * as Config from "../../services/configuration";
import { createTimerForWork } from "../creators";

export class ElapsedTimer implements ITimerState {
    constructor(private timerObj: TimerType) {
        this.timer = createTimerForWork();
    }

    private timer: Timer;

    getState(): TimerStates {
        return 'elapsed';
    }

    getVisibilityState(): TimerVisibilityStates {
        return undefined;
    }

    getTimerMode(): TimerMode {
        return undefined;
    }

    changeTimerMode(timerObj: Timer) {
        this.timer = timerObj;
        return this;
    }

    restart() {
        this.timerObj.timer.stop();
        this.timerObj.timer = this.timer;
        // registerTimerEvents(this.timerObj);

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
