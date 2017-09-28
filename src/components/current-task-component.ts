import { window, StatusBarItem, StatusBarAlignment, Memento } from 'vscode';
import { EventEmitter } from 'events';
import { updateAsync } from '../services/task-store';
import { Task } from '../types/task';
import { Messages } from '../types/messages';
import { CommandMappingsEnum } from '../types/command-mappings';

type ListenerDelegate = (pomodoroCounter: number) => void;

type CurrentTask = {
    selectedTask: Task | null;
    statusBarSelectedTask: StatusBarItem;
    emitter: EventEmitter;
};

let currentTask: CurrentTask = {
    selectedTask: null,
    statusBarSelectedTask: window.createStatusBarItem(StatusBarAlignment.Right, 1),
    emitter: new EventEmitter()
};

export const hasTaskAssigned = () => {
    return currentTask.selectedTask != null;
};

export const onPomodoroCounterUpdated = (listener: ListenerDelegate) => {
    currentTask.emitter.on(Messages.UpdatePomodoriCounter, listener);
};

export const displayCurrentTask = () => {
    if (!currentTask.selectedTask) return;

    currentTask.statusBarSelectedTask.show();
};

export const hideCurrentTask = () => {
    currentTask.statusBarSelectedTask.hide();
};

export const incrementPomodoriCounter = () => {
    if (!currentTask.selectedTask || currentTask.selectedTask.completedPomodori >= currentTask.selectedTask.estimatedPomodori) return;

    currentTask.selectedTask.completedPomodori += 1;
    currentTask.statusBarSelectedTask.text = getPomodoroStats(currentTask.selectedTask);
    currentTask.emitter.emit(Messages.UpdatePomodoriCounter, currentTask.selectedTask.completedPomodori);
};

export const updatePomodoroCounter = async (pomodoroCounter: number) => {
    if (!currentTask.selectedTask) return;

    currentTask.selectedTask.completedPomodori = pomodoroCounter;
    await updateAsync(currentTask.selectedTask);
};

export const setCurrentWorkingTask = (selectedTask: Task) => {
    currentTask.selectedTask = selectedTask;
    currentTask.statusBarSelectedTask.text = getPomodoroStats(selectedTask);
    currentTask.statusBarSelectedTask.command = CommandMappingsEnum.DisplayTaskboard;
    currentTask.statusBarSelectedTask.tooltip = 'Current working task';
    currentTask.statusBarSelectedTask.color = '#bfbfbf';
};

export const removeCurrentWorkingTask = (selectedTask: Task) => {
    if (currentTask.selectedTask && currentTask.selectedTask.name == selectedTask.name) {
        currentTask.selectedTask = null;
        currentTask.statusBarSelectedTask.dispose();
        currentTask.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        return true;
    }
    return false;
};

const getPomodoroStats = (task: Task) => {
    return `${task.name} - ${task.completedPomodori}/${task.estimatedPomodori}`;
};
