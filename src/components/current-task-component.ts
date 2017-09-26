import { window, StatusBarItem, StatusBarAlignment, Memento } from 'vscode';
import { EventEmitter } from 'events';
import { updateAsync } from '../services/task-store';
import { Task, NoTask, ValidTask } from '../types/task';
import { Messages } from '../types/messages';
import { CommandMappingsEnum } from '../types/command-mappings';

type CurrentTask = {
    selectedTask: Task;
    statusBarSelectedTask: StatusBarItem;
    emitter: EventEmitter;
};

const currentTask: CurrentTask = {
    selectedTask: {} as NoTask,
    statusBarSelectedTask: window.createStatusBarItem(StatusBarAlignment.Right, 1),
    emitter: new EventEmitter()
};

export const hasTaskAssigned = () => {
    return currentTask.selectedTask != null;
};

export const getEmitter = () => {
    return currentTask.emitter;
};

export const displayCurrentTask = () => {
    if (currentTask.selectedTask) {
        currentTask.statusBarSelectedTask.show();
    }
};

export const hideCurrentTask = () => {
    currentTask.statusBarSelectedTask.hide();
};

export const incrementPomodoriCounter = () => {
    if (currentTask.selectedTask.kind == 'valid' && currentTask.selectedTask.completedPomodori < currentTask.selectedTask.estimatedPomodori) {
        currentTask.selectedTask.completedPomodori += 1;
        currentTask.statusBarSelectedTask.text =
            `${currentTask.selectedTask.name} - ${currentTask.selectedTask.completedPomodori}/${currentTask.selectedTask.estimatedPomodori}`;
        currentTask.emitter.emit(Messages.UpdatePomodoriCounter, currentTask.selectedTask.completedPomodori);
    }
};

export const updatePomodoroCounter = async (pomodoroCounter: number) => {
    if (currentTask.selectedTask.kind == 'valid') {
        currentTask.selectedTask.completedPomodori = pomodoroCounter;
        await updateAsync(currentTask.selectedTask);
    }
};

export const setCurrentWorkingTask = (selectedTask: ValidTask) => {
    currentTask.selectedTask = selectedTask;
    currentTask.statusBarSelectedTask.text = `${selectedTask.name} - ${selectedTask.completedPomodori}/${selectedTask.estimatedPomodori}`;
    currentTask.statusBarSelectedTask.command = CommandMappingsEnum.DisplayTaskboard;
    currentTask.statusBarSelectedTask.tooltip = 'Current working task';
    currentTask.statusBarSelectedTask.color = '#bfbfbf';
};

export const removeCurrentWorkingTask = (selectedTask: ValidTask) => {
    if (currentTask.selectedTask.kind == 'valid' && currentTask.selectedTask.name == selectedTask.name) {
        currentTask.selectedTask = {} as NoTask;
        currentTask.statusBarSelectedTask.dispose();
        currentTask.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        return true;
    }
    return false;
};
