import { window, workspace, ExtensionContext, InputBoxOptions } from 'vscode';
import { TimerComponent } from './components/timer-component';
import { TaskBoardComponent } from './components/taskboard-component';
import { CurrentTaskComponent } from './components/current-task-component';
import { registerCommands } from './register-commands';

import Messages = PomoTimer.Messages;
import TaskPick = PomoTimer.TaskPick;

export const createApp = async (context: ExtensionContext) => {
    const config = workspace.getConfiguration('pomotimer');
    const workMinutes = 1;// config.get<number>('workTime') || 25;
    const breakMinutes = 2;// config.get<number>('breakTime') || 5;

    let workTimerComponent = new TimerComponent(workMinutes);
    // let breakTimerComponent = new TimerComponent(breakMinutes);
    let taskboadComponent = new TaskBoardComponent(context.globalState);
    let currentTaskComponent = new CurrentTaskComponent(context.globalState);

    onTimerElapsed(workTimerComponent, currentTaskComponent);
    onTaskAttached(workTimerComponent, taskboadComponent, currentTaskComponent);
    onTaskDetached(workTimerComponent, taskboadComponent, currentTaskComponent);
    onTaskCounterUpdated(currentTaskComponent);

    await registerCommands(context);
};

const onTimerElapsed = (workTimerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    workTimerComponent.on(Messages.TimerElapsed, () => {
        window.showInformationMessage('Time for a break');
        workTimerComponent.hideTimer();
        currentTaskComponent.incrementPomodoriCounter();
    });
};

const onTaskAttached = (workTimerComponent: TimerComponent,
    taskboadComponent: TaskBoardComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    taskboadComponent.on(Messages.AttachTask, (selectedTaskPick: TaskPick) => {
        currentTaskComponent.setCurrentWorkingTask(selectedTaskPick.task);
        currentTaskComponent.displayCurrentTask();
        workTimerComponent.displayTimer();
    });
};

const onTaskDetached = (workTimerComponent: TimerComponent,
    taskboadComponent: TaskBoardComponent,
    currentTaskComponent: CurrentTaskComponent) => {

    taskboadComponent.on(Messages.DetachTask, (selectedTaskPick: TaskPick) => {
        const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTaskPick.task);
        if (wasRemoved) {
            workTimerComponent.restartTimer();
        }
    });
};

const onTaskCounterUpdated = (currentTaskComponent: CurrentTaskComponent) => {
    currentTaskComponent.on(Messages.UpdatePomodoriCounter, async (completedPomodori: number) => {
        await currentTaskComponent.updatePomodoroCounter(completedPomodori);
    });
};


