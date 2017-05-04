import { commands, ExtensionContext, workspace } from 'vscode';
import { Timer } from './timer';

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('pomotimer')
    let statusBarTimer = new Timer(config.get<number>('workTime'));

    let displayTimerDisposable = commands.registerCommand('pomotimer.displayTimer', () => {
        statusBarTimer.displayTimer('pomotimer.startTimer');
    });

    let startTimerDisposable = commands.registerCommand('pomotimer.startTimer', () => {
        statusBarTimer.startTimer('pomotimer.finishTimer');
    });

    let finishTimerDisposable = commands.registerCommand('pomotimer.finishTimer', () => {
        statusBarTimer.finishTimer('pomotimer.displayTimer');
    });

    context.subscriptions.push(displayTimerDisposable, startTimerDisposable, finishTimerDisposable);
}

export function deactivate() { }
