import * as vscode from 'vscode';
import { window, commands } from 'vscode';
import { ExtensionContext, StatusBarAlignment } from 'vscode';

export function activate(context: ExtensionContext) {
    let playStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 1);
    playStatusBarItem.color = 'white';

    let displayTimerDisposable = commands.registerCommand('pomotimer.displayTimer', () => {
        playStatusBarItem.text = '$(triangle-right)';
        playStatusBarItem.command = 'pomotimer.startTimer';
        playStatusBarItem.tooltip = 'Start timer';
        playStatusBarItem.show();
    });

    let startTimerDisposable = commands.registerCommand('pomotimer.startTimer', () => {
        setTimeout(() => {
            const statusBarText = playStatusBarItem.text;
            if (statusBarText.includes('time')) {
                playStatusBarItem.text = playStatusBarItem.text +
                    playStatusBarItem.text.substring(
                        statusBarText.indexOf(':'),
                        statusBarText.length);
            }
            playStatusBarItem.text = `$(primitive-square) time:${1}`;
        }, 2000);
        // do { }
        // while (++counter < 10);
    });


    context.subscriptions.push(displayTimerDisposable, startTimerDisposable);
}



export function deactivate() {
}