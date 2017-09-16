import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { CurrentTaskComponent } from '../components/current-task-component';
import { TaskBoardComponent } from '../components/taskboard-component';
import { TimerComponent } from '../components/timer-component';

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
