import { window, StatusBarItem, StatusBarAlignment, Memento } from 'vscode';
import { EventEmitter } from 'events';
import { TaskStore } from '../services/task-store';

import CommandMappingsEnum = PomoTimer.CommandMappingsEnum;
import Task = PomoTimer.Task;
import Messages = PomoTimer.Messages;

export class CurrentTaskComponent extends EventEmitter {
    constructor(memento: Memento) {
        super();
        this.selectedTask = null;
        this.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        this.taskStore = new TaskStore(memento);
    }

    taskStore: TaskStore;

    private _selectedTask: Task | null;
    get selectedTask() { return this._selectedTask; }
    set selectedTask(value) { this._selectedTask = value; }

    private _statusBarSelectedTask: StatusBarItem;
    get statusBarSelectedTask() { return this._statusBarSelectedTask; }
    set statusBarSelectedTask(value) { this._statusBarSelectedTask = value; }

    displayCurrentTask() {
        if (this.selectedTask) {
            this.statusBarSelectedTask.show();
        }
    }

    hideCurrentTask() {
        this.statusBarSelectedTask.hide();
    }

    incrementPomodoriCounter() {
        if (this.selectedTask && this.selectedTask.completedPomodori < this.selectedTask.estimatedPomodori) {
            this.selectedTask.completedPomodori += 1;
            this.statusBarSelectedTask.text =
                `${this.selectedTask.name} - ${this.selectedTask.completedPomodori}/${this.selectedTask.estimatedPomodori}`;
            this.emit(Messages.UpdatePomodoriCounter, this.selectedTask.completedPomodori);
        }
    }

    async updatePomodoroCounter(pomodoroCounter: number) {
        if (this.selectedTask) {
            this.selectedTask.completedPomodori = pomodoroCounter;
            await this.taskStore.updateAsync(this.selectedTask);
        }
    }

    setCurrentWorkingTask(selectedTask: Task) {
        this.selectedTask = selectedTask;
        this.statusBarSelectedTask.text = `${selectedTask.name} - ${selectedTask.completedPomodori}/${selectedTask.estimatedPomodori}`;
        this.statusBarSelectedTask.command = CommandMappingsEnum.DisplayTaskboard;
        this.statusBarSelectedTask.tooltip = 'Current working task';
        this.statusBarSelectedTask.color = '#bfbfbf';
    }

    removeCurrentWorkingTask(selectedTask: Task) {
        if (this.selectedTask && this.selectedTask.name == selectedTask.name) {
            this.selectedTask = null;
            this.statusBarSelectedTask.dispose();
            this.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
            return true;
        }
        return false;
    }
}
