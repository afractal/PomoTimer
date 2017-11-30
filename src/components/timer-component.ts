import { Timer } from 'sharp-timer';
import { CommandMappingsEnum } from '../types/command-mappings';
import { Messages } from '../types/messages';
import { TimerKind, WorkTimer } from '../types/timer-kind';
import { pomodoroSizeInMinutes, breakSizeInMinutes } from '../services/configuration-service';
import { StatusBarItem, ParameterInformation } from 'vscode';

/*
    initial state -> can only start
    running state -> can pause and restart
    paused state -> can start and restart
    type TM = UnstartedTimer | RunningTimer | PausedTimer | ElapsedTimer;
*/

type ListerDelegate = () => void;

// export const onTimerElapsing = (timerComponent: TimerKind, listener: ListerDelegate) => {
//     timerComponent.emitter.on(Messages.TimerElapsing, listener);
// };

export class TimerComponent {
    constructor(timerComponent: WorkTimer) {
        this.timerComponent = timerComponent;
    }

    private timerComponent: WorkTimer;

    dispatchTimerElapsed = (listener: ListerDelegate) => {
        this.timerComponent.emitter.on(Messages.TimerElapsed, listener);
    };

    displayTimer() {
        this.setDisplayStatusAction();
        this.refreshStatusClock();

        this.hookUpEvents();
        this.timerComponent.statusBarClock.show();
        this.timerComponent.statusBarAction.show();
    }

    startTimer() {
        // if (this.timerComponent.isRunning) return;

        // this.timerComponent.isRunning = true;
        this.timerComponent.timer.start();
        this.setStartStatusAction();
    }

    pauseTimer() {
        this.timerComponent.timer.pause();
        this.setPauseStatusAction();
        this.refreshStatusClock();
    }

    resumeTimer() {
        this.timerComponent.timer.resume();
        this.setResumeStatusAction();
    }

    restartTimer() {
        this.timerComponent.timer.stop();
        // this.timerComponent.isRunning = false;

        this.timerComponent.timer = new Timer(pomodoroSizeInMinutes * 60);
        this.hookUpEvents();
        this.setStartStatusAction();
        this.refreshStatusClock();
    }

    hideTimer() {
        this.timerComponent.statusBarAction.hide();
        this.timerComponent.statusBarClock.hide();
    }

    destroyTimer() {
        this.timerComponent.timer = new Timer(pomodoroSizeInMinutes * 60);
    }


    private refreshStatusClock() {
        this.timerComponent.statusBarClock.text = this.timerComponent.timer.toString();
    }

    private setDisplayStatusAction() {
        this.timerComponent.statusBarAction.command = 'pomotimer.startTimer';
        this.timerComponent.statusBarAction.text = '$(triangle-right)';
        this.timerComponent.statusBarAction.tooltip = 'Start timer';
    }

    private setStartStatusAction() {
        this.timerComponent.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerComponent.statusBarAction.text = '$(triangle-right)';
        this.timerComponent.statusBarAction.tooltip = 'Pause timer';
    }

    private setPauseStatusAction() {
        this.timerComponent.statusBarAction.command = 'pomotimer.resumeTimer';
        this.timerComponent.statusBarAction.text = '$(triangle-right)';
        this.timerComponent.statusBarAction.tooltip = 'Resume timer';
    }

    private setResumeStatusAction() {
        this.timerComponent.statusBarAction.command = 'pomotimer.pauseTimer';
        this.timerComponent.statusBarAction.text = '$(triangle-right)';
        this.timerComponent.statusBarAction.tooltip = 'Pause timer';
    }

    private hookUpEvents() {
        this.timerComponent.timer.onIntervalElapsing((_: number) => {
            this.timerComponent.statusBarAction.text = '$(primitive-square)';
            this.refreshStatusClock();
            this.timerComponent.emitter.emit(Messages.TimerElapsing);
        });

        this.timerComponent.timer.onIntervalElapsed(() => {
            this.timerComponent.statusBarAction.command = 'pomotimer.restartTimer';

            this.timerComponent.statusBarAction.text = '$(sync)';
            this.timerComponent.statusBarAction.tooltip = 'Restart timer';
            this.refreshStatusClock();
            this.timerComponent.timer.stop();
            this.timerComponent.emitter.emit(Messages.TimerElapsed);
        });
    }
}
