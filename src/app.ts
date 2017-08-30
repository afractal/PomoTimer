import { workspace, commands, ExtensionContext } from 'vscode';
import { TimerComponent } from './timer-component';
import { TaskComponent } from './taskboard-component';
import { MessagingCenter } from './messaging-center';
import { Commands } from './types/commands';
import { Messages } from './types/messages';
import { TaskPick } from './types/task-pick';
import { TaskStorage } from './task-storage';

export const createApp = (context: ExtensionContext) => {
    const config = workspace.getConfiguration('pomotimer')
    let configMinutes = config.get<number>('workTime') || 20;
    let timerComponent = new TimerComponent(configMinutes, Commands.StartTimer, Commands.RestartTimer);
    let taskComponent = new TaskComponent(context.globalState);
    let taskStorage = new TaskStorage(context.globalState);

    MessagingCenter.subscribe(Messages.AttachTask, (selectedTaskPick: TaskPick) => {
        timerComponent.setCurrentWorkingTask(Commands.DisplayTaskboard, selectedTaskPick.task);
    });

    MessagingCenter.subscribe(Messages.UpdatePomodoriCounter, async (completedPomodori: number) => {
        if (timerComponent.selectedTask) {
            timerComponent.selectedTask.completedPomodori = completedPomodori;
            await taskStorage.updateAsync(timerComponent.selectedTask);
        }
    });

    const displayTimerCommand = commands.registerCommand(Commands.DisplayTimer, async () => {
        timerComponent.displayTimer();
    });

    const startTimerCommand = commands.registerCommand(Commands.StartTimer, async () => {
        if (!timerComponent.selectedTask) {
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
        timerComponent.restartTimer(Commands.StartTimer, Commands.RestartTimer);
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
