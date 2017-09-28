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

type WorkTimer = { kind: 'work' } & BaseTimer;

type BreakTimer = { kind: 'break' } & BaseTimer;

export type TimerKind = WorkTimer | BreakTimer
