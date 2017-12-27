import { ITimerState, TimerVisibilityStates, TimerMode } from "../../types";
import { Timer } from "sharp-timer";
import { BreakTimer } from "./break-timer";

export class WorkTimer implements ITimerState {
    constructor(private timerState: ITimerState) { }

    getState() {
        return this.timerState.getState();
    }

    getVisibilityState() {
        return this.timerState.getVisibilityState();
    }

    getTimerMode(): TimerMode {
        return 'work';
    }

    changeTimerMode(timerObj: Timer): ITimerState {
        this.timerState = this.timerState.changeTimerMode(timerObj);
        return new BreakTimer(this);
    }

    display() {
        this.timerState = this.timerState.display();
        return this;
    }

    hide() {
        this.timerState = this.timerState.hide();
        return this;
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

