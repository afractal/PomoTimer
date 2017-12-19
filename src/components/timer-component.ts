import { WorkTimer } from '../types/timer-kind';
import { ITimerState, UnStartedTimer } from './new-timer-oop';

export interface ITimerComponent {
    startTimer: () => ITimerComponent
    pauseTimer: () => ITimerComponent
    resumeTimer: () => ITimerComponent
    restartTimer: () => ITimerComponent

    displayTimer: () => ITimerComponent
    hideTimer: () => ITimerComponent
}

export class TimerComponent implements ITimerComponent {
    constructor(timer: WorkTimer) {
        this.timerState = new UnStartedTimer(timer);
    }

    private timerState: ITimerState;

    displayTimer(): ITimerComponent {
        this.timerState = this.timerState.display();
        return new VisibleTimerDecorator(this);
    }

    hideTimer(): ITimerComponent {
        this.timerState = this.timerState.hide();
        return new HiddenTimerDecorator(this);
    }

    startTimer() {
        this.timerState = this.timerState.start();
        return this;
    }

    pauseTimer() {
        this.timerState = this.timerState.pause();
        return this;
    }

    resumeTimer() {
        this.timerState = this.timerState.resume();
        return this;
    }

    restartTimer() {
        this.timerState = this.timerState.restart();
        return this;
    }
}

// visible timer
export class VisibleTimerDecorator implements ITimerComponent {
    constructor(private timerComponent: ITimerComponent) { }

    displayTimer() {
        return this;
    }

    hideTimer() {
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


//hidden timer
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

