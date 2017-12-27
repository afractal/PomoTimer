import { registerTimerEvents } from "../timer-utils";
import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimerType, TimerStates, BreakTimerType, TimerType, TimerMode } from "../../types";
import { Timer } from "sharp-timer";
import { createTimerForWork } from "../creators";

export class UnStartedTimer implements ITimerState {
    constructor(private timerObj: WorkTimerType | BreakTimerType) {
        this.timer = createTimerForWork();
        // registerTimerEvents(this.timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
    }

    private timer: Timer;

    getState(): TimerStates {
        return 'unstarted';
    }

    getVisibilityState() {
        return undefined;
    }

    getTimerMode(): TimerMode {
        return undefined;
    }


    changeTimerMode(timer: Timer) {
        this.timer = timer;
        return this;
    }

    display() {
        this.timerObj.statusBarAction.show()
        this.timerObj.statusBarClock.show();
        return this;
    }

    start() {
        registerTimerEvents(this.timerObj);

        this.timerObj.timer.start();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    pause: () => this;
    resume: () => this;

    restart() {
        return this;
    };

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}
