import { window, QuickPickItem } from 'vscode';

type PickTypes = 'add' | 'mark' | 'remove';

interface Pick extends QuickPickItem {
    kind: PickTypes;
}


const performAction = (picker: Pick | undefined) => {
    if (!picker) return;

    switch (picker.kind) {
        case 'add':
            console.log(picker.label);
            break;
        case 'mark':
            console.log(picker.label);
            break;
        case 'remove':
            console.log(picker.label);
            break;
    }
};

export const testPickerAsync = async () => {
    let addPick: Pick = { kind: 'add', label: 'Add new task to board', description: '' };
    let markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };
    let removePick: Pick = { kind: 'remove', label: 'Remove task from board', description: '' };

    let selectedPick = await window.showQuickPick([addPick, markPick, removePick], {
        placeHolder: 'Choose the action you want to perform'
    });

    performAction(selectedPick);
};
