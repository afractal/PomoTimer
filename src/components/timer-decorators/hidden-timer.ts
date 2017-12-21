import { ITimerComponent } from "../timer";

export class HiddenTimerDecorator implements ITimerComponent {
    constructor(private timerComponent: ITimerComponent) { }

    getState() {
        return this.timerComponent.getState();
    }

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

