import { WorkTimer } from "../types/timer-kind";
import { Messages } from "../types/messages";
import { Timer } from "sharp-timer";
import { pomodoroSizeInMinutes } from "../services/configuration-service";

interface ITimerState {
    displayTimer: () => ITimerState;
    startTimer: () => ITimerState;
    pauseTimer: () => ITimerState;
    resumeTimer: () => ITimerState;
    restartTimer: () => ITimerState;
    hideTimer: () => ITimerState;
};


export class UnDisplayed implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
        this.timerObj.timer.onIntervalElapsing((_: number) => {
            this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
            // this.timerComponent.emitter.emit(Messages.TimerElapsing);
        });

        this.timerObj.timer.onIntervalElapsed(() => {
            this.timerObj.statusBarAction.command = 'pomotimer.restartTimer';
            this.timerObj.statusBarAction.text = '$(sync)';
            this.timerObj.statusBarAction.tooltip = 'Restart timer';
            this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
            this.timerObj.timer.stop();
            this.timerObj.emitter.emit(Messages.TimerElapsed);
        });
    }

    private timerObj: WorkTimer;

    displayTimer() {
        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';
        this.timerObj.statusBarClock.show();
        this.timerObj.statusBarAction.show()
        return new UnStartedTimer(this.timerObj);
    }

    startTimer: () => this;
    pauseTimer: () => this;
    resumeTimer: () => this;
    restartTimer: () => this;
    hideTimer: () => this;
}

export class UnStartedTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    startTimer() {
        this.timerObj.timer.start();
        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';
        return new RunningTimer(this.timerObj);
    }

    displayTimer: () => this;
    pauseTimer: () => this;
    resumeTimer: () => this;
    restartTimer: () => this;
    hideTimer: () => this;
}

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
    hideTimer: () => this;
}


export class PausedTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    resumeTimer() {
        this.timerObj.timer.resume();
        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';
        return new RunningTimer(this.timerObj);
    }

    displayTimer: () => this;
    startTimer: () => this;
    pauseTimer: () => this;
    restartTimer: () => this;
    hideTimer: () => this;
}


export class ElapsedTimer implements ITimerState {
    constructor(timerObj: WorkTimer) {
        this.timerObj = timerObj;
    }

    private timerObj: WorkTimer;

    restartTimer() {
        this.timerObj.timer.stop();
        this.timerObj.timer = new Timer(pomodoroSizeInMinutes * 60);
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
    hideTimer: () => this;
}


// export class RestartedTimer { }
