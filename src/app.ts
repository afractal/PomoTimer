import { window, workspace, ExtensionContext, InputBoxOptions } from 'vscode';
import { TimerComponent } from './components/timer-component';
import { TaskBoardComponent } from './components/taskboard-component';
import { CurrentTaskComponent } from './components/current-task-component';
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
    const config = workspace.getConfiguration('pomotimer');
    const workMinutes = 1;// config.get<number>('workTime') || 25;
    const breakMinutes = 2;// config.get<number>('breakTime') || 5;

    let workTimerComponent = new TimerComponent(workMinutes);
    // let breakTimerComponent = new TimerComponent(breakMinutes);
    let taskboadComponent = new TaskBoardComponent(context.globalState);
    let currentTaskComponent = new CurrentTaskComponent(context.globalState);

    workTimerComponent.on(Messages.TimerElapsed, () => {
        window.showInformationMessage('Time for a break');
        workTimerComponent.hideTimer();
        currentTaskComponent.incrementPomodoriCounter();

        // breakTimerComponent.displayTimer();
    });

    taskboadComponent.on(Messages.AttachTask, (selectedTaskPick: TaskPick) => {
        currentTaskComponent.setCurrentWorkingTask(selectedTaskPick.task);
        currentTaskComponent.displayCurrentTask();
        workTimerComponent.displayTimer();
    });

    taskboadComponent.on(Messages.DetachTask, (selectedTaskPick: TaskPick) => {
        const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTaskPick.task);
        if (wasRemoved) {
            workTimerComponent.restartTimer();
        }
    });

    currentTaskComponent.on(Messages.UpdatePomodoriCounter, async (completedPomodori: number) => {
        await currentTaskComponent.updatePomodoroCounter(completedPomodori);
    });

    context.subscriptions.push(
        displayTaskboardCommand(taskboadComponent),
        displayTimerCommand(workTimerComponent, currentTaskComponent),
        startTimerCommand(workTimerComponent, currentTaskComponent, taskboadComponent),
        pauseTimerCommand(workTimerComponent),
        resumeTimerCommand(workTimerComponent),
        restartTimerCommand(workTimerComponent),
        hideTimerCommand(workTimerComponent, currentTaskComponent)
    );
};
