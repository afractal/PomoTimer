import { window, StatusBarAlignment, StatusBarItem } from 'vscode';
import { Timer } from 'sharp-timer';
import { EventEmitter } from 'events';
import { CommandMappingsEnum } from '../types/command-mappings';
import { Messages } from '../types/messages';
import { pomodoroSizeInMinutes } from '../services/configuration-manager';

/*
    initial state -> can only start
    running state -> can pause and restart
    paused state -> can start and restart
    type TM = UnstartedTimer | RunningTimer | PausedTimer | ElapsedTimer;
*/

type TimerComponent = {
    statusBarClock: StatusBarItem;
    statusBarAction: StatusBarItem;
    pomodoroSizeInMinutes: number;
    timer: Timer;
    isRunning: boolean;
    emitter: EventEmitter;
};

const timerComponent: TimerComponent = {
    isRunning: false,
    timer: new Timer(pomodoroSizeInMinutes * 60),
    pomodoroSizeInMinutes: pomodoroSizeInMinutes,
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3),
    emitter: new EventEmitter()
};

export const getEmitter = () => {
    return timerComponent.emitter;
};

export const displayTimer = () => {
    timerComponent.statusBarAction.command = timerComponent.statusBarAction.command || CommandMappingsEnum.StartTimer;
    timerComponent.statusBarAction.text = timerComponent.statusBarAction.text || '$(triangle-right)';
    timerComponent.statusBarAction.tooltip = timerComponent.statusBarAction.tooltip || 'Start timer';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;

    hookUpEvents();

    timerComponent.statusBarClock.show();
    timerComponent.statusBarAction.show();
};

export const startTimer = () => {
    if (timerComponent.isRunning) return;

    timerComponent.isRunning = true;
    timerComponent.timer.start();
    timerComponent.statusBarAction.command = CommandMappingsEnum.PauseTimer;
    timerComponent.statusBarAction.tooltip = 'Pause timer';
};

export const pauseTimer = () => {
    timerComponent.timer.pause();
    timerComponent.statusBarAction.command = CommandMappingsEnum.ResumeTimer;
    timerComponent.statusBarAction.tooltip = 'Start timer';
    timerComponent.statusBarAction.text = '$(triangle-right)';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
};

export const resumeTimer = () => {
    timerComponent.timer.resume();
    timerComponent.statusBarAction.command = CommandMappingsEnum.PauseTimer;
    timerComponent.statusBarAction.tooltip = 'Pause timer';
};

export const restartTimer = () => {
    timerComponent.timer.stop();
    timerComponent.isRunning = false;

    timerComponent.timer = new Timer(timerComponent.pomodoroSizeInMinutes * 60);
    resetUi();
    hookUpEvents();
};

export const hideTimer = () => {
    timerComponent.statusBarAction.hide();
    timerComponent.statusBarClock.hide();
};


const resetUi = () => {
    timerComponent.statusBarAction.command = CommandMappingsEnum.StartTimer;
    timerComponent.statusBarAction.text = '$(triangle-right)';
    timerComponent.statusBarAction.tooltip = 'Start timer';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
};

const hookUpEvents = () => {
    timerComponent.timer.onIntervalElapsing((_: number) => {
        timerComponent.statusBarAction.text = '$(primitive-square)';
        timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
        timerComponent.emitter.emit(Messages.TimerElapsing);
    });

    timerComponent.timer.onIntervalElapsed(() => {
        timerComponent.statusBarAction.command = CommandMappingsEnum.RestartTimer;
        timerComponent.statusBarAction.text = '$(sync)';
        timerComponent.statusBarAction.tooltip = 'Restart timer';
        timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
        timerComponent.timer.stop();
        timerComponent.emitter.emit(Messages.TimerElapsed);
    });
};
