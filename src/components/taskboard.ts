import { window, InputBoxOptions } from 'vscode';
import { EventEmitter } from 'events';
import { MessagingCenter } from '../services/messaging-center';
import { Task, Taskboard, Messages, TaskPick, PickType } from '../types';
import * as TaskStore from '../services/task-store';

type ListenerDelegate = (taskPick: Task) => void;

export class TaskboardComponent {
    constructor(private taskboard: Taskboard) { }

    async showTaskboard() {
        const selectedPick = await window.showQuickPick(this.createPickers(), {
            placeHolder: 'Choose the action you want to perform'
        });

        await this.performAction(selectedPick);
    }

    private createPickers() {
        const choosePick: PickType = {
            kind: 'choose',
            label: 'Choose task from board',
            description: ''
        };

        const addPick: PickType = {
            kind: 'add',
            label: 'Add new task to board',
            description: ''
        };

        const resetPick: PickType = {
            kind: 'reset',
            label: 'Reset task from board',
            description: ''
        };

        const removePick: PickType = {
            kind: 'remove',
            label: 'Remove task from board',
            description: ''
        };
        // const markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };

        return [choosePick, addPick, resetPick, removePick];
    }

    private async showChoosePicker() {
        const taskPick = await window.showQuickPick(this.getTaskPicks(), {
            placeHolder: 'Choose the task you want to add to the timer'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.AttachTask, taskPick.task);
    }

    private async showAddPicker() {
        const taskName = await window.showInputBox({
            placeHolder: 'Enter the name of the task you want to add'
        });

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

        await TaskStore.insertNew(task);
        await this.showTaskboard();
    }

    private async showResetPicker() {
        const tasks = this.getTaskPicks()
            .filter(t => t.task.completedPomodori > 0);

        const taskPick = await window.showQuickPick(tasks, {
            placeHolder: 'Enter the name of the task you want to reset'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.UpdatePomodoriCounter, 0);

        await TaskStore.reset(taskPick.task);
        await this.showTaskboard();
    }

    private async showRemovePicker() {
        const taskPick = await window.showQuickPick(this.getTaskPicks(), {
            placeHolder: 'Enter the name of the task you want to remove'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.DetachTask, taskPick.task);

        await TaskStore.remove(taskPick.task);
        await this.showTaskboard();
    }

    private async showMarkPicker() { }

    private async performAction(picker: PickType | undefined) {
        if (!picker) return;

        switch (picker.kind) {
            case 'choose':
                await this.showChoosePicker();
                break;
            case 'add':
                await this.showAddPicker();
                break;
            case 'remove':
                await this.showRemovePicker();
                break;
            case 'mark':
                await this.showMarkPicker();
                break;
            case 'reset':
                await this.showResetPicker();
                break;
            default:
                throw 'Picker kind not found!';
        }
    }

    private getTaskPicks = (): TaskPick[] =>
        TaskStore
            .getTasks()
            .map(this.mapTaskPicker);

    private mapTaskPicker = (task: Task): TaskPick => ({
        label: task.name,
        description: `${task.completedPomodori}/${task.estimatedPomodori}`,
        task: task
    });
}
