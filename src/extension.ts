import { window, commands, ExtensionContext, workspace } from 'vscode';
import { getTimerCommands } from './timer-manager';
import { TaskManager } from './task-manager';

export function activate(context: ExtensionContext) {
    const taskBoardCommand = commands.registerCommand('pomotimer.displayTaskboard', async () => {
        await new TaskManager(context.globalState).testPickerAsync();
    });

    const timerCommands = getTimerCommands();
    context.subscriptions.push(taskBoardCommand, ...timerCommands);
}

export function deactivate() { }