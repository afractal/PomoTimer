import { TimerVisibilityStates, ITimerComponent, ITimerDecorator } from "../../types";
import { HiddenTimerDecorator } from "./hidden-timer";

export class VisibleTimerDecorator implements ITimerDecorator {
    constructor(private timerComponent: ITimerComponent) { }

    getState() {
        return this.timerComponent.getState();
    }

    getVisibilityState(): TimerVisibilityStates {
        return 'visible';
    }

    displayTimer() {
        return this;
    }

    hideTimer() {
        this.timerComponent.hideTimer();
        return new HiddenTimerDecorator(this.timerComponent);
    }

    startTimer() {
        this.timerComponent.startTimer();
        return this;
    }

    pauseTimer() {
        this.timerComponent.pauseTimer();
        return this;
    }

    resumeTimer() {
        this.timerComponent.resumeTimer();
        return this;
    }

    restartTimer() {
        this.timerComponent.restartTimer();
        return this;
    }
}
