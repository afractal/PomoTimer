import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TimerComponent } from '../timer-component';


export const pauseTimerCommand = (timerComponent: TimerComponent) => {
    return commands.registerCommand(Commands.PauseTimer, () => {
        timerComponent.pauseTimer();
    });
};
