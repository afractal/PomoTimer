import { window, QuickPickItem, Memento } from 'vscode';
import { TaskStorage } from './task-storage';
import { MessagingCenter } from './messaging-center';

interface Pick extends QuickPickItem {
    kind: 'add' | 'mark' | 'remove' | 'choose';
}

type lol = {
    name: string,
    lol: number
};

var baby: lol = {
    lol: 1,
    name: ''
};

export class TaskManager {
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

        MessagingCenter.publish('attach-task', taskPick.label);
    }

    private async showAddPickerAsync() {
        const taskName = await window.showInputBox({
            placeHolder: 'Enter the name of the task'
        });

        if (!taskName) return;

        await this.taskStorage.insertAsync(taskName);
        await this.showTaskboard();
    }

    private async showRemovePickerAsync() {
        const taskPicks = this.getTaskPicks();

        const taskPick = await window.showQuickPick(taskPicks, {
            placeHolder: ''
        });

        if (!taskPick) return;

        await this.taskStorage.removeAsync(taskPick.label);
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
        return this.taskStorage.getTaskNames()
            .map(t => ({
                label: t,
                description: ''
            } as QuickPickItem));
    }
}
