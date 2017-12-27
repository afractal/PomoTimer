import { ITimerState, WorkTimerType, TimerStates, BreakTimerType, TimerMode, TimerVisibilityStates, TimerType } from "../../types";
import { Timer } from "sharp-timer";
import { BaseTimer } from "./base-timer";


export class RunningTimer implements ITimerState {
    constructor(private timerObj: TimerType) {
        this.baseTimer = new BaseTimer(timerObj);
    }

    private baseTimer: BaseTimer;

    getState(): TimerStates {
        return 'running';
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

    pause() {
        return this.baseTimer.pause();
    }

    display() {
        this.baseTimer.display();
        return this;
    }

    start() {
        return this;
    }

    resume() {
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
