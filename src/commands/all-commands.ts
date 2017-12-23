import { createWorkTimer, createCurrentTask, createTaskboard } from "../components/creators";
import { TimerComponent } from "../components/timer";
import { CurrentTaskComponent } from "../components/current-task";
import { TaskboardComponent } from "../components/taskboard";
import { commands, window, ExtensionContext, } from 'vscode';
import { MessagingCenter } from "../services/messaging-center";
import { Messages, ITimerDecorator } from "../types";
import { HiddenTimerDecorator } from "../components/timer-decorators/hidden-timer";

const registerCommand = commands.registerCommand;

let workTimerComponent: ITimerDecorator =
    new HiddenTimerDecorator(
        new TimerComponent(createWorkTimer()))

let currentTaskComponent =
    new CurrentTaskComponent(createCurrentTask());

let taskboardComponent =
    new TaskboardComponent(createTaskboard());


MessagingCenter.subscribe(Messages.TimerElapsed, () => {
    window.showInformationMessage('Time for a break');
    currentTaskComponent.incrementPomodoriCounter();
    // workTimerComponent.restartTimer();
})

MessagingCenter.subscribe(Messages.AttachTask, selectedTask => {
    currentTaskComponent.setCurrentWorkingTask(selectedTask);
    displayCommandLogic();
});

MessagingCenter.subscribe(Messages.DetachTask, selectedTask => {
    const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTask);
    if (wasRemoved) {
        restartCommandLogic();
    }
});

MessagingCenter.subscribe(Messages.UpdatePomodoriCounter, async (completedPomodori) => {
    await currentTaskComponent.updatePomodoroCounter(completedPomodori);
});

// ==========================================

const showTaskboardCommandLogic = async () => {
    await taskboardComponent.showTaskboard();
};

const displayCommandLogic = () => {
    workTimerComponent = workTimerComponent.displayTimer();
    currentTaskComponent.displayCurrentTask();
};

const hideCommandLogic = () => {
    workTimerComponent = workTimerComponent.hideTimer();
    currentTaskComponent.hideCurrentTask();
};

const startCommandLogic = async () => {
    if (!currentTaskComponent.hasTaskAssigned()) {
        await showTaskboardCommandLogic();
    }
    else {
        workTimerComponent = workTimerComponent.startTimer();
    }
};

const pauseCommandLogic = () => {
    workTimerComponent = workTimerComponent.pauseTimer();
};

const resumeCommandLogic = () => {
    workTimerComponent = workTimerComponent.resumeTimer();
};

const restartCommandLogic = () => {
    workTimerComponent = workTimerComponent.restartTimer();
};

const displayOrHideCommand = registerCommand('pomotimer.displayOrHideTimer', () => {
    switch (workTimerComponent.getVisibilityState()) {
        case 'hidden':
            displayCommandLogic();
            break;

        case 'visible':
            hideCommandLogic();
            break;

        default:
            throw 'Invalid visibility state';
    }
});

const startOrResumeCommand = registerCommand('pomotimer.startOrPauseTimer', async () => {
    displayCommandLogic();

    switch (workTimerComponent.getState()) {
        case 'paused':
            resumeCommandLogic();
            break;

        case 'unstarted':
            await startCommandLogic();
            break;

        case 'running':
            pauseCommandLogic();
            break;

        default:
            throw 'Invalid state';
    }
});

const displayTimerCommand = registerCommand('pomotimer.displayTimer', displayCommandLogic);

const startTimerCommand = registerCommand('pomotimer.startTimer', startCommandLogic);

const pauseTimerCommand = registerCommand('pomotimer.pauseTimer', pauseCommandLogic);

const resumeTimerCommand = registerCommand('pomotimer.resumeTimer', resumeCommandLogic);

const restartTimerCommand = registerCommand('pomotimer.restartTimer', restartCommandLogic);

const hideTimerCommand = registerCommand('pomotimer.hideTimer', hideCommandLogic);

const displayTaskboardCommand = registerCommand('pomotimer.displayTaskboard', showTaskboardCommandLogic);

export const registerAllCommands = (context: ExtensionContext) => {
    context.subscriptions.push(
        displayTimerCommand,
        startTimerCommand,
        pauseTimerCommand,
        resumeTimerCommand,
        restartTimerCommand,
        hideTimerCommand,
        displayTaskboardCommand,
        displayOrHideCommand,
        startOrResumeCommand
    );
};
