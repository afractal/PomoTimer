import { ITimerComponent } from "../timer-component";

export class HiddenTimerDecorator implements ITimerComponent {
    constructor(private timerComponent: ITimerComponent) { }

    displayTimer() {
        this.timerComponent.displayTimer();
        return this;
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

