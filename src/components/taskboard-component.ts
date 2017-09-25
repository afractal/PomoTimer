import { window, QuickPickItem, Memento } from 'vscode';
import { insertAsync, removeAsync, getTasks } from '../services/task-store';
import { EventEmitter } from 'events';
import { Messages } from '../types/messages';
import { Task } from '../types/task';
import { TaskPick } from '../types/task-pick';
import { Pick } from '../types/pick-interface';

type Taskboard = {
    emitter: EventEmitter;
};

let taskboard: Taskboard;

export const init = (memento: Memento) => {
    taskboard = {
        emitter: new EventEmitter()
    };
};

export const getEmitter = () => {
    return taskboard.emitter;
};

export const showTaskboard = async () => {
    const choosePick: Pick = { kind: 'choose', label: 'Choose task from board', description: '' };
    const addPick: Pick = { kind: 'add', label: 'Add new task to board', description: '' };
    const removePick: Pick = { kind: 'remove', label: 'Remove task from board', description: '' };
    // const markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };

    const selectedPick = await window.showQuickPick([choosePick, addPick, removePick], {
        placeHolder: 'Choose the action you want to perform'
    });

    await performActionAsync(selectedPick);
};

const showChoosePickerAsync = async () => {
    const taskPicks = getTaskPicks();

    const taskPick = await window.showQuickPick(taskPicks, {
        placeHolder: 'Choose the task you want to add to the timer'
    });

    if (!taskPick) return;

    taskboard.emitter.emit(Messages.AttachTask, taskPick);
};

const showAddPickerAsync = async () => {
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
    await insertAsync(task);
    await showTaskboard();
};

const showRemovePickerAsync = async () => {
    const taskPicks = getTaskPicks();

    const taskPick = await window.showQuickPick(taskPicks, {
        placeHolder: 'Enter the name of the task you want to remove'
    });

    if (!taskPick) return;

    taskboard.emitter.emit(Messages.DetachTask, taskPick);
    await removeAsync(taskPick.label);
    await showTaskboard();
};

const showMarkPickerAsync = async () => { };

const performActionAsync = async (picker: Pick | undefined) => {
    if (!picker) return;

    switch (picker.kind) {
        case 'choose':
            await showChoosePickerAsync();
            break;
        case 'add':
            await showAddPickerAsync();
            break;
        case 'remove':
            await showRemovePickerAsync();
            break;
        case 'mark':
            await showMarkPickerAsync();
            break;
    }
};

const getTaskPicks = () => {
    return getTasks()
        .map(t => ({
            label: t.name,
            description: `${t.completedPomodori}/${t.estimatedPomodori}`,
            task: t
        } as TaskPick));
};
