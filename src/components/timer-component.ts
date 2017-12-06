import { Timer } from 'sharp-timer';
import { CommandMappingsEnum } from '../types/command-mappings';
import { Messages } from '../types/messages';
import { TimerKind, WorkTimer } from '../types/timer-kind';
import { pomodoroSizeInMinutes, breakSizeInMinutes } from '../services/configuration-service';
import { StatusBarItem, ParameterInformation } from 'vscode';
import { ITimerState, UnDisplayed } from './new-timer-next';

type ListerDelegate = () => void;

// export const onTimerElapsing = (timerComponent: TimerKind, listener: ListerDelegate) => {
//     timerComponent.emitter.on(Messages.TimerElapsing, listener);
// };

export class TimerComponent {
    constructor(timerComponent: WorkTimer) {
        this.timerState = new UnDisplayed(timerComponent);
    }

    private timerState: ITimerState;

    displayTimer() {
        this.timerState = this.timerState.displayTimer();
    }

    startTimer() {
        this.timerState = this.timerState.startTimer();
    }

    pauseTimer() {
        this.timerState = this.timerState.pauseTimer();
    }

    resumeTimer() {
        this.timerState = this.timerState.resumeTimer();
    }

    restartTimer() {
        this.timerState = this.timerState.restartTimer();
    }

    hideTimer() {
        this.timerState = this.timerState.hideTimer();
    }
}
