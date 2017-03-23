import * as vscode from 'vscode';
import { window, commands } from 'vscode';
import { ExtensionContext } from 'vscode';
import { Timer } from './timer';

export function activate(context: ExtensionContext) {
    let statusBarTimer = new Timer('idle');

    let displayTimerDisposable = commands.registerCommand('pomotimer.displayTimer', () => {
        statusBarTimer.displayTimer('pomotimer.startTimer');
    });

    let startTimerDisposable = commands.registerCommand('pomotimer.startTimer', () => {
        statusBarTimer.startTimer();
    });


    context.subscriptions.push(displayTimerDisposable, startTimerDisposable);
}

export function deactivate() { }
