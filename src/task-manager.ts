import { window, QuickPickItem, Memento } from 'vscode';
import { TaskStorage } from './task-storage';

interface Pick extends QuickPickItem {
    kind: 'add' | 'mark' | 'remove';
}

export class TaskManager {
    constructor(memento: Memento) {
        this.taskStorage = new TaskStorage(memento);
    }
    taskStorage: TaskStorage;

    testPickerAsync = async () => {
        let addPick: Pick = { kind: 'add', label: 'Add new task to board', description: '' };
        let markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };
        let removePick: Pick = { kind: 'remove', label: 'Remove task from board', description: '' };

        let selectedPick = await window.showQuickPick([addPick, markPick, removePick], {
            placeHolder: 'Choose the action you want to perform'
        });

        await this.performActionAsync(selectedPick);
    };

    private async showAddTaskPickerAsync() {
        const taskName = await window.showInputBox({
            placeHolder: 'Enter the name of the task'
        });

        if (!taskName) return;

        await this.taskStorage.insertAsync(taskName);
        window.showInformationMessage(`${taskName} added`);
    }

    private async showRemoveTaskAsync() {
        const taskPicks = this.taskStorage.getTaskNames()
            .map(t => ({
                label: t,
                description: ''
            } as QuickPickItem));

        const taskPick = await window.showQuickPick(taskPicks, {
            placeHolder: ''
        });

        if (!taskPick) return;

        await this.taskStorage.removeAsync(taskPick.label);
        window.showInformationMessage(`${taskPick.label} removed`);
    };

    private performActionAsync = async (picker: Pick | undefined) => {
        if (!picker) return;

        switch (picker.kind) {
            case 'add':
                await this.showAddTaskPickerAsync();
                break;
            case 'mark':
                console.log(picker.label);
                break;
            case 'remove':
                await this.showRemoveTaskAsync();
                break;
        }
    };
}
