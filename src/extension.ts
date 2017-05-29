import { window, StatusBarAlignment, StatusBarItem, commands, ExtensionContext, workspace } from 'vscode';
import { Timer } from 'sharp-timer';
import { TimerComponent } from './timer-component';

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('pomotimer')
    let configMinutes = config.get<number>('workTime');
    let timerComponent = new TimerComponent(configMinutes, 'pomotimer.startTimer', 'pomotimer.restartTimer');

    const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', () => {
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
