import { window, StatusBarItem, StatusBarAlignment, Memento } from 'vscode';
import { EventEmitter } from 'events';
import { updateAsync, createStore } from '../services/task-store';
import { Task } from '../types/task';
import { Messages } from '../types/messages';
import { CommandMappingsEnum } from '../types/command-mappings';
import { CurrentTask } from '../types/current-task';

type ListenerDelegate = (pomodoroCounter: number) => void;

export class CurrentTaskComponent {
    constructor(currentTask: CurrentTask) {
        this.currentTask = currentTask;
    }

    private currentTask: CurrentTask;

    hasTaskAssigned = () => {
        return this.currentTask.selectedTask != null;
    };

    onPomodoroCounterUpdated = (listener: ListenerDelegate) => {
        this.currentTask.emitter.on(Messages.UpdatePomodoriCounter, listener);
    };

    displayCurrentTask = () => {
        if (!this.currentTask.selectedTask) return;
        this.currentTask.statusBarSelectedTask.show();
    };

    hideCurrentTask = () => {
        this.currentTask.statusBarSelectedTask.hide();
    };

    incrementPomodoriCounter = () => {
        if (!this.currentTask.selectedTask ||
            this.currentTask.selectedTask.completedPomodori >= this.currentTask.selectedTask.estimatedPomodori) return;

        this.currentTask.selectedTask.completedPomodori += 1;
        this.currentTask.statusBarSelectedTask.text = this.getPomodoroStats(this.currentTask.selectedTask);
        this.currentTask.emitter.emit(Messages.UpdatePomodoriCounter, this.currentTask.selectedTask.completedPomodori);
    };

    updatePomodoroCounter = async (pomodoroCounter: number) => {
        if (!this.currentTask.selectedTask) return;

        this.currentTask.selectedTask.completedPomodori = pomodoroCounter;
        await updateAsync(this.currentTask.selectedTask);
    };

    setCurrentWorkingTask = (selectedTask: Task) => {
        this.currentTask.selectedTask = selectedTask;
        this.currentTask.statusBarSelectedTask.text = this.getPomodoroStats(selectedTask);
        this.currentTask.statusBarSelectedTask.command = CommandMappingsEnum.DisplayTaskboard;
        this.currentTask.statusBarSelectedTask.tooltip = 'Current working task';
        this.currentTask.statusBarSelectedTask.color = '#bfbfbf';
    };

    removeCurrentWorkingTask = (selectedTask: Task) => {
        if (this.currentTask.selectedTask && this.currentTask.selectedTask.name == selectedTask.name) {
            this.currentTask.selectedTask = null;
            this.currentTask.statusBarSelectedTask.dispose();
            this.currentTask.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
            return true;
        }
        return false;
    };

    getPomodoroStats = (task: Task) => {
        return `${task.name} - ${task.completedPomodori}/${task.estimatedPomodori}`;
    };
}
