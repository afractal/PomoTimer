import { ITimerState, TimerType, TimerStates, TimerVisibilityStates, TimerMode, Messages } from "../../types";
import { createTimerForWork } from "../creators";
import { Timer } from "sharp-timer";
import { MessagingCenter } from "../../services/messaging-center";
import { UnStartedTimer } from "./unstarted-timer";
import { RunningTimer } from "./running-timer";
import { PausedTimer } from "./paused-timer";


export class BaseTimer {
    constructor(private timerObject: TimerType) {
        this.timer = createTimerForWork();
    }

    private timer: Timer;

    changeTimerMode(timerObj: Timer): void {
        this.timer = timerObj;
    }

    display(): void {
        this.timerObject.statusBarAction.show();
        this.timerObject.statusBarClock.show();
    }

    start(): ITimerState {
        this.registerTimerEvents(this.timerObject);

        this.timerObject.timer.start();

        this.timerObject.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObject.statusBarAction.text = '$(primitive-square)';
        this.timerObject.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObject);
    }

    pause(): ITimerState {
        this.timerObject.timer.pause();

        this.timerObject.statusBarAction.command = 'pomotimer.resumeTimer';
        this.timerObject.statusBarAction.text = '$(triangle-right)';
        this.timerObject.statusBarAction.tooltip = 'Resume timer';

        this.timerObject.statusBarClock.text = this.timerObject.timer.toString();

        return new PausedTimer(this.timerObject);
    }

    resume(): ITimerState {
        this.timerObject.timer.resume();

        this.timerObject.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObject.statusBarAction.text = '$(primitive-square)';
        this.timerObject.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObject);
    }

    restart(): ITimerState {
        this.timerObject.timer.stop();
        this.timerObject.timer = this.timer;
        // registerTimerEvents(this.timerObj);

        this.timerObject.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObject.statusBarAction.text = '$(triangle-right)';
        this.timerObject.statusBarAction.tooltip = 'Start timer';

        this.timerObject.statusBarClock.text = this.timerObject.timer.toString();

        return new UnStartedTimer(this.timerObject);
    }

    hide(): void {
        this.timerObject.statusBarAction.hide();
        this.timerObject.statusBarClock.hide();
    }

    private registerTimerEvents(timerObj: TimerType) {

        timerObj.timer.onIntervalElapsing((_: number) => {
            timerObj.statusBarClock.text = timerObj.timer.toString();

            MessagingCenter.publish(Messages.TimerElapsing, null);
        });

        timerObj.timer.onIntervalElapsed(() => {
            timerObj.statusBarAction.command = 'pomotimer.restartTimer';
            timerObj.statusBarAction.text = '$(sync)';
            timerObj.statusBarAction.tooltip = 'Restart timer';

            timerObj.statusBarClock.text = timerObj.timer.toString();

            timerObj.timer.stop();

            MessagingCenter.publish(Messages.TimerElapsed, null);
        });
    };
}
