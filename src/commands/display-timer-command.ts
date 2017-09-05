import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TimerComponent } from '../timer-component';
import { CurrentTaskComponent } from '../current-task-component';

export const displayTimerCommand = (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    return commands.registerCommand(Commands.DisplayTimer, async () => {
        timerComponent.displayTimer();
        currentTaskComponent.displayCurrentTask();
    });
};
