import { Timer } from "sharp-timer";
import { TimerKind, BreakTimer, WorkTimer } from "../types/timer-kind";
import { StatusBarAlignment, window } from "vscode";
import { EventEmitter } from "events";
import { pomodoroSizeInMinutes, breakSizeInMinutes } from "../services/configuration-service";
import { CurrentTask } from "../types/current-task";
import { Taskboard } from "../types/taskboard";

export const createWorkTimer = (): WorkTimer => ({
    kind: 'work',
    isRunning: false,
    timer: new Timer(pomodoroSizeInMinutes * 60),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3),
    emitter: new EventEmitter()
});

export const createBreakTimer = (): BreakTimer => ({
    kind: 'break',
    isRunning: false,
    timer: new Timer(breakSizeInMinutes * 60),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3),
    emitter: new EventEmitter()
});

export const createCurrentTask = (): CurrentTask => ({
    selectedTask: null,
    statusBarSelectedTask: window.createStatusBarItem(StatusBarAlignment.Right, 1),
    emitter: new EventEmitter()
});

export const createTaskboard = (): Taskboard => ({
    emitter: new EventEmitter()
});

