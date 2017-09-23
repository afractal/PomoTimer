import { window, QuickPickItem, Memento } from 'vscode';
import { TaskStore } from '../services/task-store';
import { EventEmitter } from 'events';
import { injectable } from 'inversify';

import Pick = PomoTimer.Pick;
import Messages = PomoTimer.Messages;
import Task = PomoTimer.Task;
import TaskPick = PomoTimer.TaskPick;

@injectable()
export class TaskBoardComponent extends EventEmitter implements PomoTimer.ITaskBoard {
    constructor(memento: Memento) {
        super();
        this.taskStore = new TaskStore(memento);
    }

    taskStore: TaskStore;

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

        this.emit(Messages.AttachTask, taskPick);
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
        await this.taskStore.insertAsync(task);
        await this.showTaskboard();
    }

    private async showRemovePickerAsync() {
        const taskPicks = this.getTaskPicks();

        const taskPick = await window.showQuickPick(taskPicks, {
            placeHolder: 'Enter the name of the task you want to remove'
        });

        if (!taskPick) return;

        this.emit(Messages.DetachTask, taskPick);
        await this.taskStore.removeAsync(taskPick.label);
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
        return this.taskStore.getTasks()
            .map(t => ({
                label: t.name,
                description: `${t.completedPomodori}/${t.estimatedPomodori}`,
                task: t
            } as TaskPick));
    }
}
