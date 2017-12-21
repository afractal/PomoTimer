import { createWorkTimer, createCurrentTask, createTaskboard } from "../components/creators";
import { TimerComponent, ITimerComponent } from "../components/timer";
import { CurrentTaskComponent } from "../components/current-task";
import { TaskboardComponent } from "../components/taskboard";
import { commands, window, ExtensionContext } from 'vscode';
import { MessagingCenter } from "../services/messaging-center";
import { Messages } from "../types";
import { RunningTimer } from "../components/timer-states/running-timer";
import { PausedTimer } from "../components/timer-states/paused-timer";
import { UnStartedTimer } from "../components/timer-states/unstarted-timer";

let workTimerComponent: ITimerComponent =
    new TimerComponent(createWorkTimer())

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
        workTimerComponent.restartTimer();
    }
});

MessagingCenter.subscribe(Messages.UpdatePomodoriCounter, async (completedPomodori) => {
    await currentTaskComponent.updatePomodoroCounter(completedPomodori);
});

// ===================================================================================

// start & resume should be one command - done
// display & hide should be one command


const displayTimerCommandLogic = () => {
    workTimerComponent.displayTimer();
    currentTaskComponent.displayCurrentTask();
};

const startCommandLogic = async () => {
    if (!currentTaskComponent.hasTaskAssigned())
        await taskboardComponent.showTaskboard();
    else
        workTimerComponent.startTimer();
};

const pauseCommandLogic = () => {
    workTimerComponent.pauseTimer();
};

const resumeCommandLogic = () => {
    workTimerComponent.resumeTimer();
};

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
            break;
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
    workTimerComponent.restartTimer();
});

const hideTimerCommand = commands.registerCommand('pomotimer.hideTimer', () => {
    workTimerComponent.hideTimer()
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
        displayTaskboardCommand,
        startOrResumeCommand
    );
};
