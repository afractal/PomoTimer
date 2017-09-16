import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TimerComponent } from '../components/timer-component';
import { CurrentTaskComponent } from '../components/current-task-component';

export const hideTimerCommand = (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    return commands.registerCommand(Commands.HideTimer, () => {
        timerComponent.hideTimer();
        currentTaskComponent.hideCurrentTask();
    });
};
