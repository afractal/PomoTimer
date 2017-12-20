import { WorkTimer } from '../types/timer-kind';
import { ITimerState, UnStartedTimer } from './new-timer-oop';
import { VisibleTimerDecorator } from './timer-decorators/visible-timer-component';
import { HiddenTimerDecorator } from './timer-decorators/hidden-timer-component';

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

