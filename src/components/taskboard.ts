import { window } from 'vscode';
import { insertNewAsync, removeAsync, getTasks, createStore } from '../services/task-store';
import { EventEmitter } from 'events';
import { MessagingCenter } from '../services/messaging-center';
import { Task, Taskboard, Messages, TaskPick, PickType } from '../types';

type ListenerDelegate = (taskPick: Task) => void;

export class TaskboardComponent {
    constructor(taskboard: Taskboard) {
        this.taskboard = taskboard;
    }

    private taskboard: Taskboard;


    showTaskboard = async () => {
        const choosePick: PickType = { kind: 'choose', label: 'Choose task from board', description: '' };
        const addPick: PickType = { kind: 'add', label: 'Add new task to board', description: '' };
        const removePick: PickType = { kind: 'remove', label: 'Remove task from board', description: '' };
        // const markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };

        const selectedPick = await window.showQuickPick([choosePick, addPick, removePick], {
            placeHolder: 'Choose the action you want to perform'
        });

        await this.performActionAsync(selectedPick);
    };

    private showChoosePickerAsync = async () => {
        const taskPick = await window.showQuickPick(this.getTaskPicks(), {
            placeHolder: 'Choose the task you want to add to the timer'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.AttachTask, taskPick.task);
    };

    private showAddPickerAsync = async () => {
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

        await insertNewAsync(task);
        await this.showTaskboard();
    };

    private showRemovePickerAsync = async () => {
        const taskPick = await window.showQuickPick(this.getTaskPicks(), {
            placeHolder: 'Enter the name of the task you want to remove'
        });

        if (!taskPick) return;

        MessagingCenter.publish(Messages.DetachTask, taskPick);

        await removeAsync(taskPick.task);
        await this.showTaskboard();
    };

    private showMarkPickerAsync = async () => { };

    private performActionAsync = async (picker: PickType | undefined) => {
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

    private getTaskPicks = () => {
        return getTasks().map(this.mapTaskPicker);
    };

    private mapTaskPicker = (task: Task): TaskPick => ({
        label: task.name,
        description: `${task.completedPomodori}/${task.estimatedPomodori}`,
        task: task
    });
}
