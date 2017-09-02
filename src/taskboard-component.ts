import { window, QuickPickItem, Memento } from 'vscode';
import { TaskStorage } from './task-storage';
import { MessagingCenter } from './messaging-center';
import { Pick } from './types/pick';
import { Messages } from './types/messages';
import { Task } from "./types/task";
import { TaskPick } from "./types/task-pick";

export class TaskBoardComponent {
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
            placeHolder: 'Choose the task you want to add to the timer'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.AttachTask, taskPick);
    }

    private async showAddPickerAsync() {
        const taskName = await window.showInputBox({
            placeHolder: 'Enter the name of the task you want to add'
        })

        if (!taskName) return;

        const taskEstimatedPomodori = await window.showInputBox({
            placeHolder: 'Enter the number of estimated pomodori',
        });

        if (!taskEstimatedPomodori && !+taskEstimatedPomodori) return;

        const task: Task = {
            name: taskName,
            estimatedPomodori: +taskEstimatedPomodori,
            completedPomodori: 0
        };
        await this.taskStorage.insertAsync(task);
        await this.showTaskboard();
    }

    private async showRemovePickerAsync() {
        const taskPicks = this.getTaskPicks();

        const taskPick = await window.showQuickPick(taskPicks, {
            placeHolder: 'Enter the name of the task you want to remove'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.DetachTask, taskPick);
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
        return this.taskStorage.getTasks()
            .map(t => ({
                label: t.name,
                description: `${t.completedPomodori}/${t.estimatedPomodori}`,
                task: t
            } as TaskPick));
    }
}
