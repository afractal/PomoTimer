import { TimerVisibilityStates, ITimerState, WorkTimerType, BreakTimerType, TimerMode } from "../../types";
import { HiddenTimer } from "./hidden-timer";
import { Timer } from "sharp-timer";

export class VisibleTimer implements ITimerState {
    constructor(private timerState: ITimerState) { }

    getState() {
        return this.timerState.getState();
    }

    getVisibilityState(): TimerVisibilityStates {
        return 'visible';
    }

    getTimerMode(): TimerMode {
        return undefined;
    }

    changeTimerMode(timerObj: Timer): ITimerState {
        this.timerState = this.timerState.changeTimerMode(timerObj);
        return this;
    }

    display() {
        return this;
    }

    hide() {
        this.timerState = this.timerState.hide();
        return new HiddenTimer(this.timerState);
    }

    start() {
        this.timerState = this.timerState.start();
        return this;
    }

    pause() {
        this.timerState = this.timerState.pause();
        return this;
    }

    resume() {
        this.timerState = this.timerState.resume();
        return this;
    }

    restart() {
        this.timerState = this.timerState.restart();
        return this;
    }
}
