import { Timer } from "sharp-timer";
import { StatusBarAlignment, window } from "vscode";
import { WorkTimerType, BreakTimerType, CurrentTask, Taskboard } from "../types";
import * as Config from "../services/configuration";

export const createTimerForWork = (): Timer =>
    new Timer(Config.getPomodoroSizeInMinutes() * 60)

export const createTimerForBreak = (): Timer =>
    new Timer(Config.getBreakSizeInMinutes() * 60)

export const createWorkTimer = (): WorkTimerType => ({
    kind: 'work',
    timer: createTimerForWork(),
    statusBarClock: window.createStatusBarItem(StatusBarAlignment.Right, 2),
    statusBarAction: window.createStatusBarItem(StatusBarAlignment.Right, 3)
});

export const createBreakTimer = (): BreakTimerType => ({
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

