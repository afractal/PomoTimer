import { window, workspace, commands, ExtensionContext } from 'vscode';
import { TimerComponent } from './timer-component';
import { TaskBoardComponent } from './taskboard-component';
import { CurrentTaskComponent } from './current-task-component';
import { MessagingCenter } from './messaging-center';
import { Commands } from './types/commands';
import { Messages } from './types/messages';
import { TaskPick } from './types/task-pick';
import { TaskStorage } from './task-storage';

export const createApp = (context: ExtensionContext) => {
    const config = workspace.getConfiguration('pomotimer')
    let configMinutes = config.get<number>('workTime') || 20;
    let timerComponent = new TimerComponent(configMinutes, Commands.StartTimer);
    let taskComponent = new TaskBoardComponent(context.globalState);
    let currentTaskComponent = new CurrentTaskComponent();
    let taskStorage = new TaskStorage(context.globalState);

    timerComponent.onTimeCompleted(() => {
        const currentWorkingTask = currentTaskComponent.selectedTask;
        window.showInformationMessage('Time for a break');

        if (currentWorkingTask && currentWorkingTask.completedPomodori < currentWorkingTask.estimatedPomodori) {
            currentWorkingTask.completedPomodori += 1;
            currentTaskComponent.statusBarSelectedTask.text = `${currentWorkingTask.name} - ${currentWorkingTask.completedPomodori}/${currentWorkingTask.estimatedPomodori}`;
            MessagingCenter.publish(Messages.UpdatePomodoriCounter, currentWorkingTask.completedPomodori);
        }
    }, Commands.RestartTimer);


    MessagingCenter.subscribe(Messages.AttachTask, (selectedTaskPick: TaskPick) => {
        currentTaskComponent.setCurrentWorkingTask(Commands.DisplayTaskboard, selectedTaskPick.task);
        currentTaskComponent.display();
        timerComponent.displayTimer();
    });

    MessagingCenter.subscribe(Messages.DetachTask, (selectedTaskPick: TaskPick) => {
        const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTaskPick.task);
        if (wasRemoved) {
            timerComponent.timer.stop();
            timerComponent.restartTimer(Commands.StartTimer);
        }
    });

    MessagingCenter.subscribe(Messages.UpdatePomodoriCounter, async (completedPomodori: number) => {
        if (currentTaskComponent.selectedTask) {
            currentTaskComponent.selectedTask.completedPomodori = completedPomodori;
            await taskStorage.updateAsync(currentTaskComponent.selectedTask);
        }
    });

    const displayTimerCommand = commands.registerCommand(Commands.DisplayTimer, async () => {
        timerComponent.displayTimer();
    });

    const startTimerCommand = commands.registerCommand(Commands.StartTimer, async () => {
        if (!currentTaskComponent.selectedTask) {
            await taskComponent.showTaskboard();
        } else {
            timerComponent.startTimer(Commands.PauseTimer);
        }
    });

    const pauseTimerCommand = commands.registerCommand(Commands.PauseTimer, () => {
        timerComponent.pauseTimer(Commands.ResumeTimer);
    });

    const resumeTimerCommand = commands.registerCommand(Commands.ResumeTimer, () => {
        timerComponent.resumeTimer(Commands.PauseTimer);
    });

    const restartTimerCommand = commands.registerCommand(Commands.RestartTimer, () => {
        timerComponent.restartTimer(Commands.StartTimer);
    });

    const hideTimerCommand = commands.registerCommand(Commands.HideTimer, () => {
        timerComponent.hideTimer();
    });

    const displayTaskboardCommand = commands.registerCommand(Commands.DisplayTaskboard, async () => {
        await taskComponent.showTaskboard();
    });

    context.subscriptions.push(displayTaskboardCommand, displayTimerCommand,
        startTimerCommand, pauseTimerCommand, resumeTimerCommand,
        restartTimerCommand, hideTimerCommand);
};
