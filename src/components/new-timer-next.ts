import { WorkTimer } from "../types/timer-kind";
import { Messages } from "../types/messages";
import { Timer } from "sharp-timer";
import { MessagingCenter } from "../services/messaging-center";
import { getPomodoroSizeInMinutes } from "../services/configuration-service";

export interface ITimerState {
    displayTimer: () => ITimerState;
    startTimer: () => ITimerState;
    pauseTimer: () => ITimerState;
    resumeTimer: () => ITimerState;
    restartTimer: () => ITimerState;
    hideTimer: () => ITimerState;
};


// UnDisplayed
export class UnDisplayed implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    displayTimer() {
        this.timerObj.timer.onIntervalElapsing((_: number) => {
            this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
        });

        this.timerObj.timer.onIntervalElapsed(() => {
            this.timerObj.statusBarAction.command = 'pomotimer.restartTimer';
            this.timerObj.statusBarAction.text = '$(sync)';
            this.timerObj.statusBarAction.tooltip = 'Restart timer';
            this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
            this.timerObj.timer.stop();
            MessagingCenter.publish('timer-elapsed', null);
        });

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        this.timerObj.statusBarClock.show();
        this.timerObj.statusBarAction.show()
        return new UnStartedTimer(this.timerObj);
    }

    startTimer: () => this;
    pauseTimer: () => this;
    resumeTimer: () => this;
    restartTimer: () => this;

    hideTimer() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// UnStartedTimer
export class UnStartedTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    startTimer() {
        this.timerObj.timer.start();
        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';
        return new RunningTimer(this.timerObj);
    }

    displayTimer: () => this;
    pauseTimer: () => this;
    resumeTimer: () => this;
    restartTimer: () => this;

    hideTimer() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// RunningTimer
export class RunningTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    pauseTimer() {
        this.timerObj.timer.pause();

        this.timerObj.statusBarAction.command = 'pomotimer.resumeTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Resume timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
        return new PausedTimer(this.timerObj);
    }

    displayTimer: () => this;
    startTimer: () => this;
    resumeTimer: () => this;
    restartTimer: () => this;

    hideTimer() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// PausedTimer
export class PausedTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    resumeTimer() {
        this.timerObj.timer.resume();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    displayTimer: () => this;
    startTimer: () => this;
    pauseTimer: () => this;
    restartTimer: () => this;

    hideTimer() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// ElapsedTimer
export class ElapsedTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    restartTimer() {
        this.timerObj.timer.stop();

        this.timerObj.timer = new Timer(getPomodoroSizeInMinutes() * 60);
        this.timerObj.timer.onIntervalElapsing((_: number) => {
            this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
        });

        this.timerObj.timer.onIntervalElapsed(() => {
            this.timerObj.statusBarAction.command = 'pomotimer.restartTimer';
            this.timerObj.statusBarAction.text = '$(sync)';
            this.timerObj.statusBarAction.tooltip = 'Restart timer';
            this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
            this.timerObj.timer.stop();
            MessagingCenter.publish('timer-elapsed', null);
        });

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        return new UnStartedTimer(this.timerObj);
    }

    displayTimer: () => this;
    startTimer: () => this;
    pauseTimer: () => this;
    resumeTimer: () => this;

    hideTimer() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

