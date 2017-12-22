import { TimerVisibilityStates, ITimerComponent, ITimerDecorator } from "../../types";
import { VisibleTimerDecorator } from "./visible-timer";

export class HiddenTimerDecorator implements ITimerDecorator {
    constructor(private timerComponent: ITimerComponent) { }

    getState() {
        return this.timerComponent.getState();
    }

    getVisibilityState(): TimerVisibilityStates {
        return 'hidden';
    }

    displayTimer() {
        this.timerComponent.displayTimer();
        return new VisibleTimerDecorator(this.timerComponent);
    }

    hideTimer() {
        return this;
    }

    startTimer() {
        return this;
    }

    pauseTimer() {
        return this;
    }

    resumeTimer() {
        return this;
    }

    restartTimer() {
        return this;
    }
}

