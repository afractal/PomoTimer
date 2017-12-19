import { Timer } from "sharp-timer";
import { TimerKind, BreakTimer, WorkTimer } from "../types/timer-kind";
import { StatusBarAlignment, window } from "vscode";
import { CurrentTask } from "../types/current-task";
import { Taskboard } from "../types/taskboard";
import * as Config from "../services/configuration-service";

export const createWorkTimer = (): WorkTimer => ({
    kind: 'work',
    isRunning: false,
    timer: new Timer(Config.getPomodoroSizeInMinutes() * 60),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3)
});

export const createBreakTimer = (): BreakTimer => ({
    kind: 'break',
    isRunning: false,
    timer: new Timer(Config.getBreakSizeInMinutes() * 60),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3)
});

export const createCurrentTask = (): CurrentTask => ({
    selectedTask: null,
    statusBarSelectedTask: window.createStatusBarItem(StatusBarAlignment.Right, 1)
});

export const createTaskboard = (): Taskboard => ({
});

