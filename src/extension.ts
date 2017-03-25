import { commands, ExtensionContext } from 'vscode';
import { Timer } from './timer';

export function activate(context: ExtensionContext) {
    let statusBarTimer = new Timer(25);

    let displayTimerDisposable = commands.registerCommand('pomotimer.displayTimer', () => {
        statusBarTimer.displayTimer('pomotimer.startTimer');
    });

    let startTimerDisposable = commands.registerCommand('pomotimer.startTimer', () => {
        statusBarTimer.startTimer('pomotimer.finishTimer', 1);
    });

    let finishTimerDisposable = commands.registerCommand('pomotimer.finishTimer', () => {
        statusBarTimer.finishTimer('pomotimer.displayTimer');
    });

    context.subscriptions.push(displayTimerDisposable, startTimerDisposable);
}

export function deactivate() { }
