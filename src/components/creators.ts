import { Timer } from "sharp-timer";
import { StatusBarAlignment, window } from "vscode";
import { WorkTimer, BreakTimer, CurrentTask, Taskboard } from "../types";
import * as Config from "../services/configuration";

export const createTimerForWork = (): Timer =>
    new Timer(Config.getPomodoroSizeInMinutes() * 60)

export const createTimerForBreak = (): Timer =>
    new Timer(Config.getBreakSizeInMinutes() * 60)

export const createWorkTimer = (): WorkTimer => ({
    kind: 'work',
    timer: createTimerForWork(),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3)
});

export const createBreakTimer = (): BreakTimer => ({
    kind: 'break',
    timer: createTimerForBreak(),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3)
});

export const createCurrentTask = (): CurrentTask => ({
    selectedTask: null,
    statusBarSelectedTask: window.createStatusBarItem(StatusBarAlignment.Right, 1)
});

export const createTaskboard = (): Taskboard => ({
});

