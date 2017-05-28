import { window, StatusBarAlignment, StatusBarItem, commands, ExtensionContext, workspace } from 'vscode';
import { Timer } from 'sharp-timer';
import { TimerComponent } from './timer-component';
// import { TimerManager } from './timer-manager';
/*
register commands
- displayTimer
- hideTimer
*/
export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('pomotimer')
    let configMinutes = config.get<number>('workTime');

    let timerComponent = new TimerComponent(configMinutes);


    let statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 1);
    statusBarItem.command = 'pomotimer.startTimer';
    statusBarItem.tooltip = 'Start timer';

    let timer = new Timer(configMinutes * 60);
    statusBarItem.text = `$(triangle-right)  ${timer.toString()}`;

    timer.onIntervalElapsing(r => {
        statusBarItem.text = `$(primitive-square)  ${timer.toString()}`;
    });
    timer.onIntervalElapsed(() => {
        statusBarItem.command = "pomotimer.restartTimer";
        statusBarItem.text = `$(sync)  ${timer.toString()}`;
        statusBarItem.tooltip = 'Restart timer';
        timer.stop();
        timer = null;
        window.showInformationMessage('Time for a break');
    });


    let displayTimerDisposable = commands.registerCommand('pomotimer.displayTimer', () => {
        statusBarItem.show();
    });

    let startTimerDisposable = commands.registerCommand('pomotimer.startTimer', () => {
        timer.start();
        statusBarItem.command = 'pomotimer.pauseTimer';
        statusBarItem.tooltip = 'Pause timer';
    });

    let pauseTimerDisposable = commands.registerCommand('pomotimer.pauseTimer', () => {
        timer.pause();
        statusBarItem.command = 'pomotimer.resumeTimer';
        statusBarItem.tooltip = 'Start timer';
        statusBarItem.text = `$(triangle-right)  ${timer.toString()}`;
    });

    let resumeTimerDisposable = commands.registerCommand('pomotimer.resumeTimer', () => {
        timer.resume();
        statusBarItem.command = 'pomotimer.pauseTimer';
        statusBarItem.tooltip = 'Pause timer';
    });

    let restartTimerDisposable = commands.registerCommand('pomotimer.restartTimer', () => {
        timer = null;
        timer = new Timer(configMinutes * 60);
        timer.start();
        statusBarItem.command = 'pomotimer.pauseTimer';
        statusBarItem.tooltip = 'Pause timer';
        timer.onIntervalElapsing(r => {
            statusBarItem.text = `$(primitive-square)  ${timer.toString()}`;
        });
        timer.onIntervalElapsed(() => {
            statusBarItem.command = "pomotimer.restartTimer";
            statusBarItem.text = `$(sync)  ${timer.toString()}`;
            statusBarItem.tooltip = 'Restart timer';
            timer.stop();
            timer = null;
            window.showInformationMessage('Time for a break');
        });
    });

    let hideTimerDisposable = commands.registerCommand('pomotimer.hideTimer', () => {
        statusBarItem.hide();
    });

    context.subscriptions.push(
        displayTimerDisposable,
        pauseTimerDisposable,
        hideTimerDisposable,
        startTimerDisposable,
        restartTimerDisposable
    );
}

export function deactivate() { }
