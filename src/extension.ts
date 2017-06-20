import { window, commands, ExtensionContext, workspace, QuickPickItem } from 'vscode';
import { TimerComponent } from './timer-component';

type PickTypes = 'add' | 'mark' | 'remove';

interface Pick extends QuickPickItem {
    kind: PickTypes;
}

let performAction = (picker: Pick | undefined) => {
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

let testPickerAsync = async () => {
    let addPick: Pick = { kind: 'add', label: 'Add new task to board', description: '' };
    let markPick: Pick = { kind: 'mark', label: 'Mark task as done', description: '' };
    let removePick: Pick = { kind: 'remove', label: 'Remove task from board', description: '' };

    let selectedPick = await window.showQuickPick([addPick, markPick, removePick], {
        placeHolder: 'Choose the action you want to perform'
    });

    performAction(selectedPick);
};

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('pomotimer')
    let configMinutes = config.get<number>('workTime');
    let timerComponent = new TimerComponent(configMinutes || 0, 'pomotimer.startTimer', 'pomotimer.restartTimer');

    const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', async () => {
        await testPickerAsync();
        timerComponent.displayTimer();
    });

    const startTimerCommand = commands.registerCommand('pomotimer.startTimer', () => {
        timerComponent.startTimer('pomotimer.pauseTimer');
    });

    const pauseTimerCommand = commands.registerCommand('pomotimer.pauseTimer', () => {
        timerComponent.pauseTimer('pomotimer.resumeTimer');
    });

    const resumeTimerCommand = commands.registerCommand('pomotimer.resumeTimer', () => {
        timerComponent.resumeTimer('pomotimer.pauseTimer');
    });

    const restartTimerCommand = commands.registerCommand('pomotimer.restartTimer', () => {
        timerComponent.restartTimer('pomotimer.startTimer', 'pomotimer.restartTimer');
    });

    const hideTimerCommand = commands.registerCommand('pomotimer.hideTimer', () => {
        timerComponent.hideTimer();
    });

    context.subscriptions.push(displayTimerCommand, startTimerCommand, pauseTimerCommand, restartTimerCommand, hideTimerCommand);
}

export function deactivate() { }
