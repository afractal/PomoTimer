import { createWorkTimer, createCurrentTask, createTaskboard } from "../components/creators";
import { TimerComponent, VisibleTimerDecorator, ITimerComponent, HiddenTimerDecorator } from "../components/timer-component";
import { CurrentTaskComponent } from "../components/current-task-component";
import { TaskboardComponent } from "../components/taskboard-component";
import { commands, window, ExtensionContext } from 'vscode';
import { MessagingCenter } from "../services/messaging-center";
import { Messages } from "../types/messages";

let workTimerComponent: ITimerComponent =
    new TimerComponent(createWorkTimer())

let currentTaskComponent =
    new CurrentTaskComponent(createCurrentTask());

let taskboardComponent =
    new TaskboardComponent(createTaskboard());


MessagingCenter.subscribe(Messages.TimerElapsed, () => {
    window.showInformationMessage('Time for a break');
    currentTaskComponent.incrementPomodoriCounter();
    workTimerComponent.restartTimer();
})

MessagingCenter.subscribe(Messages.AttachTask, selectedTask => {
    currentTaskComponent.setCurrentWorkingTask(selectedTask);
    currentTaskComponent.displayCurrentTask();
    // workTimerComponent.displayTimer();
});

MessagingCenter.subscribe(Messages.DetachTask, selectedTask => {
    const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTask);
    if (wasRemoved) {
        workTimerComponent.restartTimer();
    }
});

MessagingCenter.subscribe(Messages.UpdatePomodoriCounter, async (completedPomodori) => {
    await currentTaskComponent.updatePomodoroCounter(completedPomodori);
});

// ===================================================================================

const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', () => {
    workTimerComponent.displayTimer();
    currentTaskComponent.displayCurrentTask();
});

const startTimerCommand = commands.registerCommand('pomotimer.startTimer', async () => {
    if (!currentTaskComponent.hasTaskAssigned())
        await taskboardComponent.showTaskboard();
    else
        workTimerComponent.startTimer();
});

const pauseTimerCommand = commands.registerCommand('pomotimer.pauseTimer', () => {
    workTimerComponent.pauseTimer();
});

const resumeTimerCommand = commands.registerCommand('pomotimer.resumeTimer', () => {
    workTimerComponent.resumeTimer();
});

const restartTimerCommand = commands.registerCommand('pomotimer.restartTimer', () => {
    workTimerComponent.restartTimer();
});

const hideTimerCommand = commands.registerCommand('pomotimer.hideTimer', () => {
    workTimerComponent = workTimerComponent.hideTimer()
    currentTaskComponent.hideCurrentTask();
});

const displayTaskboardCommand = commands.registerCommand('pomotimer.displayTaskboard', async () => {
    await taskboardComponent.showTaskboard();
});

export const registerAllCommands = (context: ExtensionContext) => {
    context.subscriptions.push(
        displayTimerCommand,
        startTimerCommand,
        pauseTimerCommand,
        resumeTimerCommand,
        restartTimerCommand,
        hideTimerCommand,
        displayTaskboardCommand
    );
};
