import { Timer } from "sharp-timer";
import { StatusBarItem } from "vscode";
import { EventEmitter } from "events";

type BaseTimer = {
    statusBarClock: StatusBarItem;
    statusBarAction: StatusBarItem;
    timer: Timer;
    isRunning: boolean;
    emitter: EventEmitter;
};

export type WorkTimer = BaseTimer & { kind: 'work' };

export type BreakTimer = BaseTimer & { kind: 'break' };

export type TimerKind = WorkTimer | BreakTimer

