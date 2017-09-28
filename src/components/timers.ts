import { Timer } from "sharp-timer";
import { TimerKind } from "../types/timer-kind";
import { StatusBarAlignment, window } from "vscode";
import { EventEmitter } from "events";
import { pomodoroSizeInMinutes, breakSizeInMinutes } from "../services/configuration-manager";

export const workTimer: TimerKind = {
    kind: 'work',
    isRunning: false,
    timer: new Timer(pomodoroSizeInMinutes * 60),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3),
    emitter: new EventEmitter()
};

export const breakTimer: TimerKind = {
    kind: 'break',
    isRunning: false,
    timer: new Timer(breakSizeInMinutes * 60),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3),
    emitter: new EventEmitter()
};

//  { timer: new Timer(breakSizeInMinutes * 60), ...workTimer }
