import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { CurrentTaskComponent } from '../current-task-component';
import { TaskBoardComponent } from '../taskboard-component';
import { TimerComponent } from '../timer-component';

export const startTimerCommand = (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent,
    taskboadComponent: TaskBoardComponent) => {
    return commands.registerCommand(Commands.StartTimer, async () => {
        if (!currentTaskComponent.selectedTask) {
            await taskboadComponent.showTaskboard();
        } else {
            timerComponent.startTimer();
        }
    });
};
