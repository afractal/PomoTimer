import { RunningTimer } from "./running-timer";
import { ITimerState, WorkTimerType, TimerStates, BreakTimerType, TimerMode, TimerVisibilityStates } from "../../types";
import { Timer } from "sharp-timer";
import { registerTimerEvents } from "../timer-utils";
import { UnStartedTimer } from "./unstarted-timer";
import { createTimerForWork } from "../creators";

export class PausedTimer implements ITimerState {
    constructor(private timerObj: WorkTimerType | BreakTimerType) {
        this.timer = createTimerForWork();
    }

    private timer: Timer;

    getState(): TimerStates {
        return 'paused';
    }

    getVisibilityState(): TimerVisibilityStates {
        return undefined;
    }

    getTimerMode(): TimerMode {
        return undefined;
    }

    changeTimerMode(timer: Timer) {
        this.timer = timer;
        return this;
    }

    resume() {
        this.timerObj.timer.resume();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    display() {
        this.timerObj.statusBarAction.show();
        this.timerObj.statusBarClock.show();
        return this;
    }

    start: () => this;
    pause: () => this;

    restart() {
        return this;
    };

    // restart() {
    //     this.timerObj.timer.stop();
    //     this.timerObj.timer = this.timer;
    //     registerTimerEvents(this.timerObj);

    //     this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
    //     this.timerObj.statusBarAction.text = '$(triangle-right)';
    //     this.timerObj.statusBarAction.tooltip = 'Start timer';

    //     this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

    //     return new UnStartedTimer(this.timerObj);
    // }

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}
