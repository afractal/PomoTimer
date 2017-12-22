import { VisibleTimerDecorator } from './timer-decorators/visible-timer';
import { HiddenTimerDecorator } from './timer-decorators/hidden-timer';
import { WorkTimer, ITimerState, TimerStates, ITimerComponent } from '../types';
import { UnStartedTimer } from './timer-states/unstarted-timer';

export class TimerComponent implements ITimerComponent {
    constructor(timer: WorkTimer) {
        this.timerState = new UnStartedTimer(timer);
    }

    private timerState: ITimerState;

    getState() {
        return this.timerState.getState();
    }

    getVisibilityState() {
        return undefined;
    }

    displayTimer() {
        this.timerState = this.timerState.display();
        return this;
    }

    hideTimer() {
        this.timerState = this.timerState.hide();
        return this;
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

