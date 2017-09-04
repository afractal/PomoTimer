import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TimerComponent } from '../timer-component';
import { CurrentTaskComponent } from '../current-task-component';

export const hideTimerCommand = (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    return commands.registerCommand(Commands.HideTimer, () => {
        timerComponent.hideTimer();
        currentTaskComponent.hideCurrentTask();
    });
};
