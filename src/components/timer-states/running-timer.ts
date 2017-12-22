import { ITimerState, WorkTimer, TimerStates } from "../../types";
import { PausedTimer } from "./paused-timer";
import { registerTimerEvents } from "../timer-utils";
import { UnStartedTimer } from "./unstarted-timer";
import { Timer } from "sharp-timer";
import * as Config from "../../services/configuration";

export class RunningTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    getState(): TimerStates {
        return 'running';
    }

    pause() {
        this.timerObj.timer.pause();

        this.timerObj.statusBarAction.command = 'pomotimer.resumeTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Resume timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        return new PausedTimer(this.timerObj);
    }

    display() {
        this.timerObj.statusBarAction.show()
        this.timerObj.statusBarClock.show();
        return this;
    }

    start: () => this;
    resume: () => this;

    restart() {
        this.timerObj.timer.stop();
        registerTimerEvents(this.timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        return new UnStartedTimer(this.timerObj);
    }

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}
