import { window, QuickPickItem, QuickPickOptions } from 'vscode';

type PickTypes = 'add' | 'mark' | 'remove';

interface Pick extends QuickPickItem {
    kind: PickTypes;
}

const addTask = () => { };
const markTask = () => { };
const removeTask = () => { };

const executeTask = (picker: Pick | undefined) => {
    if (!picker) return;

    switch (picker.kind) {
        case 'add':
            addTask();
            break;
        case 'mark':
            markTask();
            break;
        case 'remove':
            removeTask();
            break;
    }
};

const initializeTasks = () => {
    const addPick: Pick = { kind: 'add', label: 'Add new task to board', description: '' };
    const markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };
    const removePick: Pick = { kind: 'remove', label: 'Remove task from board', description: '' };
    return new Array(addPick, markPick, removePick);
};

export const initTaskBoard = async () => {
    const tasks = initializeTasks();
    const quickPickOptions: QuickPickOptions = {
        placeHolder: 'Choose the action you want to perform'
    };

    const selectedPick = await window.showQuickPick(tasks, quickPickOptions);
    executeTask(selectedPick);
};




