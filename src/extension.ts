import { window, commands, ExtensionContext, workspace } from 'vscode';
import { getTimerCommands } from './timer-manager';
import { initTaskBoard } from './taskboard-component';

export function activate(context: ExtensionContext) {
    const timerCommands = getTimerCommands();
    context.subscriptions.push(...timerCommands);
}

export function deactivate() { }