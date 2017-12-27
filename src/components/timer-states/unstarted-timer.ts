import { registerTimerEvents } from "../timer-utils";
import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimerType, TimerStates, BreakTimerType, TimerType, TimerMode } from "../../types";
import { Timer } from "sharp-timer";
import { createTimerForWork } from "../creators";
import { BaseTimer } from "./base-timer";

export class UnStartedTimer implements ITimerState {
    constructor(private timerObj: WorkTimerType | BreakTimerType) {
        this.baseTimer = new BaseTimer(timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
    }

    private baseTimer: BaseTimer;

    getState(): TimerStates {
        return 'unstarted';
    }

    getVisibilityState() {
        return undefined;
    }

    getTimerMode(): TimerMode {
        return undefined;
    }

    changeTimerMode(timer: Timer) {
        this.baseTimer.changeTimerMode(timer);
        return this;
    }

    display() {
        this.baseTimer.display();
        return this;
    }

    start() {
        return this.baseTimer.start();
    }

    pause() {
        return this;
    }

    resume() {
        return this;
    }

    restart() {
        return this;
    }

    hide() {
        this.baseTimer.hide();
        return this;
    }
}
