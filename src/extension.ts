import { window, commands, ExtensionContext, workspace } from 'vscode';
import { getTimerCommands } from './timer-manager';
import { testPickerAsync } from './task-manager';

export function activate(context: ExtensionContext) {
    const taskBoardCommand = commands.registerCommand('pomotimer.displayTaskboard', async () => {
        await testPickerAsync();
    });

    const timerCommands = getTimerCommands();
    context.subscriptions.push(taskBoardCommand, ...timerCommands);
}

export function deactivate() { }