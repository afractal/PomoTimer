import { window, QuickPickItem, Memento } from 'vscode';
import { TaskStorage } from './task-storage';
import { MessagingCenter } from './messaging-center';
import { Pick } from './types/pick';
import { Messages } from './types/messages';
import { Task } from "./types/task";

export class TaskComponent {
    constructor(memento: Memento) {
        this.taskStorage = new TaskStorage(memento);
    }
    taskStorage: TaskStorage;

    async showTaskboard() {
        const choosePick: Pick = { kind: 'choose', label: 'Choose task from board', description: '' };
        const addPick: Pick = { kind: 'add', label: 'Add new task to board', description: '' };
        const removePick: Pick = { kind: 'remove', label: 'Remove task from board', description: '' };
        // const markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };

        const selectedPick = await window.showQuickPick([choosePick, addPick, removePick], {
            placeHolder: 'Choose the action you want to perform'
        });

        await this.performActionAsync(selectedPick);
    }

    private async showChoosePickerAsync() {
        const taskPicks = this.getTaskPicks();

        const taskPick = await window.showQuickPick(taskPicks, {
            placeHolder: 'Choose a task to add to the timer'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.AttachTask, taskPick.label);
    }

    private async showAddPickerAsync() {
        const taskName = await window.showInputBox({
            placeHolder: 'Enter the name of the task you want to add'
        });

        if (!taskName) return;

        const task: Task = { name: taskName };
        await this.taskStorage.insertAsync(task);
        await this.showTaskboard();
    }

    private async showRemovePickerAsync() {
        const taskPicks = this.getTaskPicks();

        const taskPick = await window.showQuickPick(taskPicks, {
            placeHolder: 'Enter the name of the task you want to remove'
        });

        if (!taskPick) return;

        const task: Task = { name: taskPick.label };
        await this.taskStorage.removeAsync(task);
        await this.showTaskboard();
    };

    private async showMarkPickerAsync() { }

    private async performActionAsync(picker: Pick | undefined) {
        if (!picker) return;

        switch (picker.kind) {
            case 'choose':
                await this.showChoosePickerAsync();
                break;
            case 'add':
                await this.showAddPickerAsync();
                break;
            case 'remove':
                await this.showRemovePickerAsync();
                break;
            case 'mark':
                await this.showMarkPickerAsync();
                break;
        }
    };

    private async getTaskPicks() {
        return this.taskStorage.getTasks()
            .map(t => ({
                label: t.name,
                description: ''
            } as QuickPickItem));
    }
}
