import { Timer } from "sharp-timer";
import { StatusBarItem } from "vscode";

type BaseTimer = {
    statusBarClock: StatusBarItem;
    statusBarAction: StatusBarItem;
    timer: Timer;
    isRunning: boolean;
};

export type WorkTimer = BaseTimer & { kind: 'work' };

export type BreakTimer = BaseTimer & { kind: 'break' };

export type TimerKind = WorkTimer | BreakTimer

