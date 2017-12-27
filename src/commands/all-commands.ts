import { createWorkTimer, createCurrentTask, createTaskboard, createBreakTimer, createTimerForBreak, createTimerForWork } from "../components/creators";
import { CurrentTaskComponent } from "../components/current-task";
import { TaskboardComponent } from "../components/taskboard";
import { commands, window, ExtensionContext, } from 'vscode';
import { MessagingCenter } from "../services/messaging-center";
import { Messages, ITimerState } from "../types";
import { HiddenTimer } from "../components/timer-decorators/hidden-timer";
import { UnStartedTimer } from "../components/timer-states/unstarted-timer";
import { WorkTimer } from "../components/timer-decorators/work-timer";

const registerCommand = commands.registerCommand;

let timer: ITimerState =
    new WorkTimer(
        new HiddenTimer(
            new UnStartedTimer(createWorkTimer())
        )
    )

let currentTaskComponent =
    new CurrentTaskComponent(createCurrentTask());

let taskboardComponent =
    new TaskboardComponent(createTaskboard());

MessagingCenter.subscribe(Messages.TimerElapsed, () => {
    console.log('timer elapsed');
    switch (timer.getTimerMode()) {
        case 'work':
            window.showInformationMessage('Time for a break');
            currentTaskComponent.incrementPomodoriCounter();
            timer = timer.changeTimerMode(createTimerForBreak());
            break;

        case 'break':
            window.showInformationMessage('Break is over');
            timer = timer.changeTimerMode(createTimerForWork());
            break;

        default:
            throw 'Invalid timer mode';
    }
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

const showTaskboardCommandLogic = async () => {
    await taskboardComponent.showTaskboard();
};

const displayCommandLogic = () => {
    timer = timer.display();
    currentTaskComponent.displayCurrentTask();
};

const hideCommandLogic = () => {
    timer = timer.hide();
    currentTaskComponent.hideCurrentTask();
};

const startCommandLogic = async () => {
    if (!currentTaskComponent.hasTaskAssigned()) {
        await showTaskboardCommandLogic();
    }
    else {
        timer = timer.start();
    }
};

const pauseCommandLogic = () => {
    timer = timer.pause();
};

const resumeCommandLogic = () => {
    timer = timer.resume();
};

const restartCommandLogic = () => {
    timer = timer.restart();
};

const displayOrHideCommand = registerCommand('pomotimer.displayOrHideTimer', () => {
    switch (timer.getVisibilityState()) {
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

const startOrPauseOrResumeCommand = registerCommand('pomotimer.startOrPauseOrResume', async () => {
    displayCommandLogic();

    switch (timer.getState()) {
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
        startOrPauseOrResumeCommand
    );
};
