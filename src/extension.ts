import { window, commands, ExtensionContext, workspace } from 'vscode';
import { TimerComponent } from './timer-component';
import { TaskManager } from './task-manager';
import { MessagingCenter } from "./messaging-center";

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('pomotimer')
    let configMinutes = config.get<number>('workTime');
    let timerComponent = new TimerComponent(
        configMinutes || 20,
        'pomotimer.startTimer',
        'pomotimer.restartTimer');

    const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', async () => {
        timerComponent.displayTimer();
    });

    const startTimerCommand = commands.registerCommand('pomotimer.startTimer', async () => {
        if (!timerComponent.selectedTask) {
            await new TaskManager(context.globalState).showTaskboard();
        } else {
            timerComponent.startTimer('pomotimer.pauseTimer');
        }
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

    const displayTaskboardCommand = commands.registerCommand('pomotimer.displayTaskboard', async () => {
        await new TaskManager(context.globalState).showTaskboard();
    });

    MessagingCenter.subscribe('attach-task', (selectedTask: string) => {
        timerComponent.setWorkingTask('pomotimer.displayTaskboard', selectedTask);
    });

    context.subscriptions.push(
        displayTaskboardCommand,
        displayTimerCommand,
        startTimerCommand,
        pauseTimerCommand,
        resumeTimerCommand,
        restartTimerCommand,
        hideTimerCommand
    );
}

export function deactivate() { }