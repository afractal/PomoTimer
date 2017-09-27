import { ExtensionContext, window } from "vscode";
import { hideTimer, displayTimer, restartTimer, onTimerElapsed } from './components/timer-component';
import { onTaskAttached, onTaskDetached } from './components/taskboard-component';
import { incrementPomodoriCounter, setCurrentWorkingTask, displayCurrentTask, removeCurrentWorkingTask, updatePomodoroCounter, onPomodoroCounterUpdated } from './components/current-task-component';

export const registerEvents = (context: ExtensionContext) => {
    registerTimerElapsed();
    registerTaskAttached();
    registerTaskDetached();
    registerTaskCounterUpdated();
};

const registerTimerElapsed = () => {
    onTimerElapsed(() => {
        window.showInformationMessage('Time for a break');
        hideTimer();
        incrementPomodoriCounter();
    });
};

const registerTaskAttached = () => {
    onTaskAttached(selectedTask => {
        setCurrentWorkingTask(selectedTask);
        displayCurrentTask();
        displayTimer();
    });
};

const registerTaskDetached = () => {
    onTaskDetached(selectedTask => {
        const wasRemoved = removeCurrentWorkingTask(selectedTask);
        if (wasRemoved) {
            restartTimer();
        }
    });
};

const registerTaskCounterUpdated = () => {
    onPomodoroCounterUpdated(async (completedPomodori: number) => {
        await updatePomodoroCounter(completedPomodori);
    });
};
