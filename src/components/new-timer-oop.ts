import { WorkTimer } from "../types/timer-kind";
import { Messages } from "../types/messages";
import { Timer } from "sharp-timer";
import { MessagingCenter } from "../services/messaging-center";
import { StatusBarItem } from "vscode";

//  Unstarted -> Running

export interface ITimerState {
    display: () => ITimerState;
    start: () => ITimerState;
    pause: () => ITimerState;
    resume: () => ITimerState;
    restart: () => ITimerState;
    hide: () => ITimerState;
};

const registerTimerEvents = (timerObj: WorkTimer) => {
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


// UnStartedTimer
export class UnStartedTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    display() {
        registerTimerEvents(this.timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';
        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        this.timerObj.statusBarAction.show()
        this.timerObj.statusBarClock.show();

        return new RunningTimer(this.timerObj);
    }

    start() {
        this.timerObj.timer.start();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    pause: () => this;
    resume: () => this;
    restart: () => this;

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// RunningTimer
export class RunningTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    pause() {
        this.timerObj.timer.pause();

        this.timerObj.statusBarAction.command = 'pomotimer.resumeTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Resume timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        return new PausedTimer(this.timerObj);
    }

    display() {
        console.log('display for running timer');
        // this.timerObj.statusBarAction.show();
        // this.timerObj.statusBarClock.show();

        return this;
    };
    start: () => this;
    resume: () => this;
    restart: () => this;

    hide() {
        console.log('hello')
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// PausedTimer
export class PausedTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    resume() {
        this.timerObj.timer.resume();

        this.timerObj.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerObj.statusBarAction.text = '$(primitive-square)';
        this.timerObj.statusBarAction.tooltip = 'Pause timer';

        return new RunningTimer(this.timerObj);
    }

    display: () => this;
    start: () => this;
    pause: () => this;
    restart: () => this;

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

// ElapsedTimer
export class ElapsedTimer implements ITimerState {
    constructor(private timerObj: WorkTimer) { }

    restart() {
        this.timerObj.timer.stop();
        registerTimerEvents(this.timerObj);

        this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
        this.timerObj.statusBarAction.text = '$(triangle-right)';
        this.timerObj.statusBarAction.tooltip = 'Start timer';

        this.timerObj.statusBarClock.text = this.timerObj.timer.toString();

        // this.timerObj.statusBarAction =
        //     new StatusBarItemBuilder(this.timerObj.statusBarAction)
        //         .withCommand('pomotimer.startTimer')
        //         .withText('$(triangle-right)')
        //         .withTooltip('Start timer')
        //         .build();

        // this.timerObj.statusBarClock =
        //     new StatusBarItemBuilder(this.timerObj.statusBarClock)
        //         .withText(this.timerObj.timer.toString())
        //         .build();

        return new UnStartedTimer(this.timerObj);
    }

    display: () => this;
    start: () => this;
    pause: () => this;
    resume: () => this;

    hide() {
        this.timerObj.statusBarAction.hide();
        this.timerObj.statusBarClock.hide();
        return this;
    }
}

class StatusBarItemBuilder {
    constructor(private statusBarItem: StatusBarItem) { }

    withCommand(command: string): this {
        this.statusBarItem.command = command;
        return this;
    }

    withText(text: string): this {
        this.statusBarItem.text = text;
        return this;
    }

    withTooltip(tooltip: string): this {
        this.statusBarItem.tooltip = tooltip;
        return this;
    }

    build() {
        return this.statusBarItem;
    }
}

