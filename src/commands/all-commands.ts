import { createWorkTimer, createCurrentTask, createTaskboard } from "../components/creators";
import { TimerComponent } from "../components/timer-component";
import { CurrentTaskComponent } from "../components/current-task-component";
import { TaskboardComponent } from "../components/taskboard-component";
import { commands, window, ExtensionContext } from "vscode";


let workTimerComponent = new TimerComponent(createWorkTimer());
let currentTaskComponent = new CurrentTaskComponent(createCurrentTask());
let taskboardComponent = new TaskboardComponent(createTaskboard());


const registerTimerElapsed = () => {
    workTimerComponent.dispatchTimerElapsed(() => {
        window.showInformationMessage('Time for a break');
        currentTaskComponent.incrementPomodoriCounter();
        // workTimerComponent.hideTimer();
        // workTimerComponent.destroyTimer();
        // workTimerComponent.displayTimer();
    });
};

const registerBreakTimerElapsed = () => {
    workTimerComponent.dispatchTimerElapsed(() => {
        // window.showInformationMessage('Time to work');
        // workTimerComponent.destroyTimer();
        // workTimerComponent.hideTimer();
        // workTimerComponent.displayTimer();
    });
};

const registerTaskAttached = () => {
    taskboardComponent.onTaskAttached(selectedTask => {
        currentTaskComponent.setCurrentWorkingTask(selectedTask);
        currentTaskComponent.displayCurrentTask();
        workTimerComponent.displayTimer();
    });
};

const registerTaskDetached = () => {
    taskboardComponent.onTaskDetached(selectedTask => {
        const wasRemoved = currentTaskComponent.removeCurrentWorkingTask(selectedTask);
        if (wasRemoved) {
            workTimerComponent.restartTimer();
        }
    });
};

const registerTaskCounterUpdated = () => {
    currentTaskComponent.onPomodoroCounterUpdated(async (completedPomodori) => {
        await currentTaskComponent.updatePomodoroCounter(completedPomodori);
    });
};

registerTimerElapsed();
registerBreakTimerElapsed();
registerTaskAttached();
registerTaskDetached();
registerTaskCounterUpdated();

const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', () => {
    workTimerComponent.displayTimer();
    currentTaskComponent.displayCurrentTask();
});

const startTimerCommand = commands.registerCommand('pomotimer.startTimer', async () => {
    if (!currentTaskComponent.hasTaskAssigned())
        await taskboardComponent.showTaskboardAsync();
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
    // workTimerComponent.startTimer();
});

const hideTimerCommand = commands.registerCommand('pomotimer.hideTimer', () => {
    workTimerComponent.hideTimer();
    currentTaskComponent.hideCurrentTask();
});

const displayTaskboardCommand = commands.registerCommand('pomotimer.displayTaskboard', async () => {
    await taskboardComponent.showTaskboardAsync();
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
