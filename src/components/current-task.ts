import { window, StatusBarItem, StatusBarAlignment, Memento } from 'vscode';
import { EventEmitter } from 'events';
import { update, createStore } from '../services/task-store';
import { MessagingCenter } from '../services/messaging-center';
import { CurrentTask, Messages, Task, CommandMappingsEnum } from '../types';

type ListenerDelegate = (pomodoroCounter: number) => void;

export class CurrentTaskComponent {
    constructor(private currentTask: CurrentTask) { }

    hasTaskAssigned = () => {
        return this.currentTask.selectedTask != null;
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

        MessagingCenter.publish(Messages.UpdatePomodoriCounter, this.currentTask.selectedTask.completedPomodori);
    };

    updatePomodoroCounter = async (pomodoroCounter: number) => {
        if (!this.currentTask.selectedTask) return;

        this.currentTask.selectedTask.completedPomodori = pomodoroCounter;
        this.currentTask.statusBarSelectedTask.text = this.getPomodoroStats(this.currentTask.selectedTask);
        await update(this.currentTask.selectedTask);
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

    private getPomodoroStats = (task: Task) => {
        return `${task.name} - ${task.completedPomodori}/${task.estimatedPomodori}`;
    };
}
