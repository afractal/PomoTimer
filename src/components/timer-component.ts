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

    onTimerElapsed = (listener: ListerDelegate) => {
        this.timerComponent.emitter.on(Messages.TimerElapsed, listener);
    };

    displayTimer() {
        this.createDisplayStatusAction();
        this.timerComponent.statusBarClock.text = this.timerComponent.timer.toString();

        this.hookUpEvents();
        this.timerComponent.statusBarClock.show();
        this.timerComponent.statusBarAction.show();
    }

    startTimer() {
        if (this.timerComponent.isRunning) return;

        this.timerComponent.isRunning = true;
        this.timerComponent.timer.start();
        this.timerComponent.statusBarAction = this.createStartStatusAction();
    }

    pauseTimer() {
        this.timerComponent.timer.pause();
        this.timerComponent.statusBarAction = this.createPauseStatusAction();
        this.timerComponent.statusBarClock.text = this.timerComponent.timer.toString();
    }

    resumeTimer() {
        this.timerComponent.timer.resume();
        this.timerComponent.statusBarAction = this.createResumeStatusAction();
    }

    restartTimer() {
        this.timerComponent.timer.stop();
        this.timerComponent.isRunning = false;

        this.timerComponent.timer = new Timer(pomodoroSizeInMinutes * 60);
        this.timerComponent.statusBarAction = this.createStartStatusAction();
        this.timerComponent.statusBarClock.text = this.timerComponent.timer.toString();
        this.hookUpEvents();
    }

    hideTimer() {
        this.timerComponent.statusBarAction.hide();
        this.timerComponent.statusBarClock.hide();
    }

    destroyTimer() {
        this.timerComponent.timer = new Timer(pomodoroSizeInMinutes * 60);
    }


    private createDisplayStatusAction() {
        this.timerComponent.statusBarAction.command = 'pomotimer.startTimer';
        this.timerComponent.statusBarAction.text = '$(triangle-right)';
        this.timerComponent.statusBarAction.tooltip = 'Start timer';
    }

    private createStartStatusAction = (): StatusBarItem => ({
        ...this.timerComponent.statusBarAction,
        command: CommandMappingsEnum.PauseTimer,
        text: '$(triangle-right)',
        tooltip: 'Pause timer'
    });

    private createPauseStatusAction = (): StatusBarItem => ({
        ...this.timerComponent.statusBarAction,
        command: CommandMappingsEnum.PauseTimer,
        text: '$(triangle-right)',
        tooltip: 'Pause timer'
    });

    private createResumeStatusAction = (): StatusBarItem => ({
        ...this.timerComponent.statusBarAction,
        command: CommandMappingsEnum.PauseTimer,
        text: '$(triangle-right)',
        tooltip: 'Pause timer'
    });

    private hookUpEvents() {
        this.timerComponent.timer.onIntervalElapsing((_: number) => {
            this.timerComponent.statusBarAction.text = '$(primitive-square)';
            this.timerComponent.statusBarClock.text = this.timerComponent.timer.toString();
            this.timerComponent.emitter.emit(Messages.TimerElapsing);
        });

        this.timerComponent.timer.onIntervalElapsed(() => {
            this.timerComponent.statusBarAction.command = CommandMappingsEnum.RestartTimer;

            this.timerComponent.statusBarAction.text = '$(sync)';
            this.timerComponent.statusBarAction.tooltip = 'Restart timer';
            this.timerComponent.statusBarClock.text = this.timerComponent.timer.toString();
            this.timerComponent.timer.stop();
            this.timerComponent.emitter.emit(Messages.TimerElapsed);
        });
    }
}
