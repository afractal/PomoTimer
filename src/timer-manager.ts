import { commands, workspace, Disposable } from 'vscode';
import { TimerComponent } from './timer-component';


const config = workspace.getConfiguration('pomotimer')
let configMinutes = config.get<number>('workTime');
let timerComponent = new TimerComponent(configMinutes || 20, 'pomotimer.startTimer', 'pomotimer.restartTimer');

const displayTimerCommand = commands.registerCommand('pomotimer.displayTimer', async () => {
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


export const getTimerCommands = (): (Disposable[]) =>
    [
        displayTimerCommand,
        startTimerCommand,
        pauseTimerCommand,
        resumeTimerCommand,
        restartTimerCommand,
        hideTimerCommand
    ];