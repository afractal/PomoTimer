import { StatusBarItem } from 'vscode';

export interface ITimer {
    remainingMinutes: number;
    remainingSeconds: number;
    statusBarItem: StatusBarItem;
    intervalId: NodeJS.Timer;

    displayTimer(startCommand: string): void;
    startTimer(finishCommand: string, durationInMinutes: number): void;
    finishTimer(startCommand: string): void;
    interruptTimer(): void;
    setInitalTimer(): void;
}

export interface ITimerConstructor<T> {
    new (remainingMinutes: number, remainingSeconds: number): T;
}