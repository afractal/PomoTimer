import { ITimerComponent } from "../timer";

export class VisibleTimerDecorator implements ITimerComponent {
    constructor(private timerComponent: ITimerComponent) { }

    getState() {
        return this.timerComponent.getState();
    }

    displayTimer() {
        return this;
    }

    hideTimer() {
        this.timerComponent.hideTimer();
        return this;
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
