import { ExtensionContext, window } from "vscode";
import { hideTimer, displayTimer, restartTimer, onTimerElapsed, destroyTimer } from './components/timer-component';
import { onTaskAttached, onTaskDetached } from './components/taskboard-component';
import { incrementPomodoriCounter, setCurrentWorkingTask, displayCurrentTask, removeCurrentWorkingTask, updatePomodoroCounter, onPomodoroCounterUpdated } from './components/current-task-component';
import { workTimer, breakTimer } from "./components/timers";

export const registerEvents = (context: ExtensionContext) => {
    registerTimerElapsed();
    registerBreakTimerElapsed();
    registerTaskAttached();
    registerTaskDetached();
    registerTaskCounterUpdated();
};

const registerTimerElapsed = () => {
    onTimerElapsed(workTimer, () => {
        window.showInformationMessage('Time for a break');
        incrementPomodoriCounter();
        hideTimer(workTimer);
        destroyTimer(workTimer);
        displayTimer(breakTimer);
    });
};

const registerBreakTimerElapsed = () => {
    onTimerElapsed(breakTimer, () => {
        window.showInformationMessage('Time to work');
        destroyTimer(breakTimer);
        hideTimer(breakTimer);
        displayTimer(workTimer);
    });
};

const registerTaskAttached = () => {
    onTaskAttached(selectedTask => {
        setCurrentWorkingTask(selectedTask);
        displayCurrentTask();
        displayTimer(workTimer);
    });
};

const registerTaskDetached = () => {
    onTaskDetached(selectedTask => {
        const wasRemoved = removeCurrentWorkingTask(selectedTask);
        if (wasRemoved) {
            restartTimer(workTimer);

        }
    });
};

const registerTaskCounterUpdated = () => {
    onPomodoroCounterUpdated(async (completedPomodori) => {
        await updatePomodoroCounter(completedPomodori);
    });
};
