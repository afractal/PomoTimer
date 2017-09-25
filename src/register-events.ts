import { ExtensionContext, window } from "vscode";

import * as Timer from './components/timer-component';
import * as Taskboard from './components/taskboard-component';
import * as CurrentTask from './components/current-task-component';
import { Messages } from "./types/messages";
import { TaskPick } from "./types/task-pick";

export const registerEvents = (context: ExtensionContext) => {
    onTimerElapsed();
    onTaskAttached();
    onTaskDetached();
    onTaskCounterUpdated();
};

const onTimerElapsed = () => {
    Timer.getEmitter().on(Messages.TimerElapsed, () => {
        window.showInformationMessage('Time for a break');
        Timer.hideTimer();
        CurrentTask.incrementPomodoriCounter();
    });
};

const onTaskAttached = () => {
    Taskboard.getEmitter().on(Messages.AttachTask, (selectedTaskPick: TaskPick) => {
        CurrentTask.setCurrentWorkingTask(selectedTaskPick.task);
        CurrentTask.displayCurrentTask();
        Timer.displayTimer();
    });
};

const onTaskDetached = () => {
    Taskboard.getEmitter().on(Messages.DetachTask, (selectedTaskPick: TaskPick) => {
        const wasRemoved = CurrentTask.removeCurrentWorkingTask(selectedTaskPick.task);
        if (wasRemoved) {
            Timer.restartTimer();
        }
    });
};

const onTaskCounterUpdated = () => {
    CurrentTask.getEmitter().on(Messages.UpdatePomodoriCounter, async (completedPomodori: number) => {
        await CurrentTask.updatePomodoroCounter(completedPomodori);
    });
};
