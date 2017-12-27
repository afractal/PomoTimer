import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimerType, TimerStates, BreakTimerType, TimerMode, TimerVisibilityStates, TimerType } from "../../types";
import { Timer } from "sharp-timer";
import { registerTimerEvents } from "../timer-utils";
import { UnStartedTimer } from "./unstarted-timer";
import { createTimerForWork } from "../creators";
import { BaseTimer } from "./base-timer";

export class PausedTimer implements ITimerState {
    constructor(private timerObj: TimerType) {
        this.baseTimer = new BaseTimer(timerObj);
    }

    private baseTimer: BaseTimer;

    getState(): TimerStates {
        return 'paused';
    }

    getVisibilityState(): TimerVisibilityStates {
        return undefined;
    }

    getTimerMode(): TimerMode {
        return undefined;
    }

    changeTimerMode(timer: Timer) {
        this.baseTimer.changeTimerMode(timer);
        return this;
    }

    resume() {
        return this.baseTimer.resume();
    }

    display() {
        this.baseTimer.display();
        return this;
    }

    start() {
        return this;
    }

    pause() {
        return this;
    }

    restart() {
        return this.baseTimer.restart();
    }

    hide() {
        this.baseTimer.hide();
        return this;
    }
}
