import { ITimerComponent } from "../timer-component";


// visible timer
export class VisibleTimerDecorator implements ITimerComponent {
    constructor(private timerComponent: ITimerComponent) { }

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
