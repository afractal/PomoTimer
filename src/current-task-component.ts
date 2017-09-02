import { window, StatusBarItem, StatusBarAlignment } from 'vscode';
import { Commands } from './types/commands';
import { Task } from './types/task';

export class CurrentTaskComponent {
    constructor() {
        this.selectedTask = null;
        this.statusBarSelectedTask = window.createStatusBarItem(StatusBarAlignment.Right, 1);
    }

    private _selectedTask: Task | null;
    get selectedTask() { return this._selectedTask; }
    set selectedTask(value) { this._selectedTask = value; }

    private _statusBarSelectedTask: StatusBarItem;
    get statusBarSelectedTask() { return this._statusBarSelectedTask; }
    set statusBarSelectedTask(value) { this._statusBarSelectedTask = value; }


    display() {
        this.statusBarSelectedTask.show();
    }

    setCurrentWorkingTask(displayTaskboardCommand: Commands, selectedTask: Task) {
        this.selectedTask = selectedTask;
        this.statusBarSelectedTask.text = `${selectedTask.name} - ${selectedTask.completedPomodori}/${selectedTask.estimatedPomodori}`;
        this.statusBarSelectedTask.command = displayTaskboardCommand;
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
