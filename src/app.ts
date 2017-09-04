import { window, workspace, ExtensionContext } from 'vscode';
import { TimerComponent } from './timer-component';
import { TaskBoardComponent } from './taskboard-component';
import { CurrentTaskComponent } from './current-task-component';
import { Messages } from './types/messages';
import { TaskPick } from './types/task-pick';

import { displayTaskboardCommand } from './commands/display-taskboard-command';
import { displayTimerCommand } from './commands/display-timer-command';
import { hideTimerCommand } from './commands/hide-timer-command';
import { pauseTimerCommand } from './commands/pause-timer-command';
import { restartTimerCommand } from './commands/restart-timer-command';
import { resumeTimerCommand } from './commands/resume-timer-command';
import { startTimerCommand } from './commands/start-timer-command';

export const createApp = async (context: ExtensionContext) => {
    const config = workspace.getConfiguration('pomotimer')
    const configMinutes = config.get<number>('workTime') || 25;

    let timerComponent = new TimerComponent(configMinutes);
    let taskboadComponent = new TaskBoardComponent(context.globalState);
    let currentTaskComponent = new CurrentTaskComponent(context.globalState);

    console.log("fsdfs")

    timerComponent.on(Messages.TimerElapsed, () => {
        window.showInformationMessage('Time for a break');
        currentTaskComponent.incrementPomodoriCounter();
    });

    taskboadComponent.on(Messages.AttachTask, (selectedTaskPick: TaskPick) => {
        currentTaskComponent.setCurrentWorkingTask(selectedTaskPick.task);
        currentTaskComponent.displayCurrentTask();
        timerComponent.displayTimer();
    });

    taskboadComponent.on(Messages.DetachTask, (selectedTaskPick: TaskPick) => {
        const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTaskPick.task);
        if (wasRemoved) {
            timerComponent.restartTimer();
        }
    });

    currentTaskComponent.on(Messages.UpdatePomodoriCounter, async (completedPomodori: number) => {
        await currentTaskComponent.updatePomodoroCounter(completedPomodori);
    });

    context.subscriptions.push(
        displayTaskboardCommand(taskboadComponent),
        displayTimerCommand(timerComponent),
        startTimerCommand(timerComponent, currentTaskComponent, taskboadComponent),
        pauseTimerCommand(timerComponent),
        resumeTimerCommand(timerComponent),
        restartTimerCommand(timerComponent),
        hideTimerCommand(timerComponent, currentTaskComponent)
    );
};
