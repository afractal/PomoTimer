import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TimerComponent } from '../timer-component';

export const displayTimerCommand = (timerComponent: TimerComponent) => {
    return commands.registerCommand(Commands.DisplayTimer, async () => {
        timerComponent.displayTimer();
    });
};
