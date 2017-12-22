import { createWorkTimer, createCurrentTask, createTaskboard } from "../components/creators";
import { TimerComponent } from "../components/timer";
import { CurrentTaskComponent } from "../components/current-task";
import { TaskboardComponent } from "../components/taskboard";
import { commands, window, ExtensionContext } from 'vscode';
import { MessagingCenter } from "../services/messaging-center";
import { Messages, ITimerDecorator, ITimerComponent } from "../types";
import { RunningTimer } from "../components/timer-states/running-timer";
import { PausedTimer } from "../components/timer-states/paused-timer";
import { UnStartedTimer } from "../components/timer-states/unstarted-timer";
import { HiddenTimerDecorator } from "../components/timer-decorators/hidden-timer";
import { VisibleTimerDecorator } from "../components/timer-decorators/visible-timer";

let workTimerComponent: ITimerDecorator =
    new HiddenTimerDecorator(
        new TimerComponent(createWorkTimer())
    )

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
    displayTimerCommandLogic();
});

MessagingCenter.subscribe(Messages.DetachTask, selectedTask => {
    const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTask);
    if (wasRemoved) {
        workTimerComponent = workTimerComponent.restartTimer();
    }
});

MessagingCenter.subscribe(Messages.UpdatePomodoriCounter, async (completedPomodori) => {
    await currentTaskComponent.updatePomodoroCounter(completedPomodori);
});

// ===================================================================================

// start & resume should be one command - done
// display & hide should be one command


const displayTimerCommandLogic = () => {
    workTimerComponent = workTimerComponent.displayTimer();
    currentTaskComponent.displayCurrentTask();
};

const hideTimerCommandLogic = () => {
    workTimerComponent = workTimerComponent.hideTimer();
    currentTaskComponent.hideCurrentTask();
};

const startCommandLogic = async () => {
    if (!currentTaskComponent.hasTaskAssigned()) {
        await taskboardComponent.showTaskboard();
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

const displayOrHideCommand = commands.registerCommand('pomotimer.displayOrHideTimer', () => {
    switch (workTimerComponent.getVisibilityState()) {
        case 'hidden':
            displayTimerCommandLogic();
            break;

        case 'visible':
            hideTimerCommandLogic();
            break;

        default:
            throw 'Invalid visibility state';
    }
});

const startOrResumeCommand = commands.registerCommand('pomotimer.startOrPauseTimer', async () => {
    displayTimerCommandLogic();

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

const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', () => {
    displayTimerCommandLogic();
});

const startTimerCommand = commands.registerCommand('pomotimer.startTimer', async () => {
    await startCommandLogic();
});

const pauseTimerCommand = commands.registerCommand('pomotimer.pauseTimer', () => {
    pauseCommandLogic();
});

const resumeTimerCommand = commands.registerCommand('pomotimer.resumeTimer', () => {
    resumeCommandLogic();
});

const restartTimerCommand = commands.registerCommand('pomotimer.restartTimer', () => {
    workTimerComponent = workTimerComponent.restartTimer();
});

const hideTimerCommand = commands.registerCommand('pomotimer.hideTimer', () => {
    hideTimerCommandLogic();
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
        displayTaskboardCommand,
        displayOrHideCommand,
        startOrResumeCommand
    );
};
