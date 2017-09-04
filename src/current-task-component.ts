import { window, StatusBarItem, StatusBarAlignment, Memento } from 'vscode';
import { Commands } from './types/command-defs';
import { Task } from './types/task';
import { EventEmitter } from 'events';
import { Messages } from './types/messages';
import { TaskStorage } from './task-storage';

export class CurrentTaskComponent extends EventEmitter {
    constructor(memento: Memento) {
        super();
        this.selectedTask = null;
        this.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
        this.taskStorage = new TaskStorage(memento);
    }

    taskStorage: TaskStorage;

    private _selectedTask: Task | null;
    get selectedTask() { return this._selectedTask; }
    set selectedTask(value) { this._selectedTask = value; }

    private _statusBarSelectedTask: StatusBarItem;
    get statusBarSelectedTask() { return this._statusBarSelectedTask; }
    set statusBarSelectedTask(value) { this._statusBarSelectedTask = value; }

    displayCurrentTask() {
        this.statusBarSelectedTask.show();
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
            await this.taskStorage.updateAsync(this.selectedTask);
        }
    }

    setCurrentWorkingTask(selectedTask: Task) {
        this.selectedTask = selectedTask;
        this.statusBarSelectedTask.text = `${selectedTask.name} - ${selectedTask.completedPomodori}/${selectedTask.estimatedPomodori}`;
        this.statusBarSelectedTask.command = Commands.DisplayTaskboard;
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
