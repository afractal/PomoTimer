import { TimerVisibilityStates, ITimerComponent, ITimerState } from "../../types";
import { VisibleTimer } from "./visible-timer";

export class HiddenTimer implements ITimerState {
    constructor(private timerState: ITimerState) { }

    getState() {
        return this.timerState.getState();
    }

    getVisibilityState(): TimerVisibilityStates {
        return 'hidden';
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

