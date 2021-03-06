import { TimerVisibilityStates, ITimerState, WorkTimerType, BreakTimerType, TimerMode } from "../../types";
import { VisibleTimer } from "./visible-timer";
import { Timer } from "sharp-timer";

export class HiddenTimer implements ITimerState {
    constructor(private timerState: ITimerState) { }

    getState() {
        return this.timerState.getState();
    }

    getVisibilityState(): TimerVisibilityStates {
        return 'hidden';
    }

    getTimerMode(): TimerMode {
        return undefined;
    }

    changeTimerMode(timerObj: Timer): ITimerState {
        this.timerState = this.timerState.changeTimerMode(timerObj);
        return this;
    }

    display() {
        this.timerState = this.timerState.display();
        return new VisibleTimer(this.timerState);
    }

    hide() {
        return this;
    }

    start() {
        return this;
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
}

