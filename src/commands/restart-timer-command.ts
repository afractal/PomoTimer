import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TimerComponent } from '../components/timer-component';

export const restartTimerCommand = (timerComponent: TimerComponent) => {
    return commands.registerCommand(Commands.RestartTimer, () => {
        timerComponent.restartTimer();
    });
};
