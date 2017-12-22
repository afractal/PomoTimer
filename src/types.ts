import { StatusBarItem } from "vscode";
import { Timer } from "sharp-timer";

export enum CommandMappingsEnum {
    DisplayTimer = 'pomotimer.displayTimer',
    PauseTimer = 'pomotimer.pauseTimer',
    ResumeTimer = 'pomotimer.resumeTimer',
    RestartTimer = 'pomotimer.restartTimer',
    HideTimer = 'pomotimer.hideTimer',
    DisplayTaskboard = 'pomotimer.displayTaskboard'
    // StartTimer = 'pomotimer.startTimer',
    // StartBreakTimer = 'pomotimer.startBreakTimer',
    // PauseBreakTimer = 'pomotimer.pauseBreakTimer',
    // RestartBreakTimer = 'pomotimer.restartBreakTimer',
}

type CommandCallback = (...args: any[]) => any

export type CommandMappings = {
    'pomotimer.displayTimer': CommandCallback
    'pomotimer.startTimer': CommandCallback
    'pomotimer.pauseTimer': CommandCallback
    'pomotimer.resumeTimer': CommandCallback
    'pomotimer.restartTimer': CommandCallback
    'pomotimer.hideTimer': CommandCallback
    'pomotimer.displayTaskboard': CommandCallback
    // 'pomotimer.startBreakTimer': CommandCallback,
    // 'pomotimer.pauseBreakTimer': CommandCallback,
    // 'pomotimer.restartBreakTimer': CommandCallback,
}

export type CurrentTask = {
    selectedTask: Task | null
    statusBarSelectedTask: StatusBarItem
}

export enum Messages {
    AttachTask = 'attach-task',
    DetachTask = 'detach-task',
    UpdatePomodoriCounter = 'update-pomodori-counter',
    TimerElapsed = 'timer-elapsed',
    TimerElapsing = 'timer-elapsing',
    // BreakTimerElapsed = 'break-timer-elapsed',
    // BreakTimerElapsing = 'break-timer-elapsed'
}

export interface PickType extends IQuickPickItem {
    kind: 'add' | 'mark' | 'remove' | 'choose'
}

export interface IQuickPickItem {
    label: string
    description: string
    detail?: string
}

export interface TaskPick extends IQuickPickItem {
    task: Task
}

export type Task = {
    name: string
    estimatedPomodori: number
    completedPomodori: number
}

export type Taskboard = {}

type BaseTimer = {
    statusBarClock: StatusBarItem
    statusBarAction: StatusBarItem
    timer: Timer
    isRunning: boolean
}

export type WorkTimer = BaseTimer & { kind: 'work' }

export type BreakTimer = BaseTimer & { kind: 'break' }

export type TimerKind = WorkTimer | BreakTimer

export interface ITimerState {
    display(): ITimerState
    start(): ITimerState
    pause(): ITimerState
    resume(): ITimerState
    restart(): ITimerState
    hide(): ITimerState

    getState(): TimerStates
}

export type TimerStates = 'unstarted' | 'running' | 'paused' | 'elapsed'

export interface ITimerComponent {
    startTimer(): ITimerDecorator
    pauseTimer(): ITimerDecorator
    resumeTimer(): ITimerDecorator
    restartTimer(): ITimerDecorator

    displayTimer(): ITimerDecorator
    hideTimer(): ITimerDecorator

    getState(): TimerStates
}


export interface ITimerDecorator extends ITimerComponent {
    getVisibilityState(): TimerVisibilityStates
}

export type TimerVisibilityStates = 'hidden' | 'visible' | undefined


export type ImmutableSetType<T> = {
    add: (item: T) => ImmutableSetType<T>
    remove: (item: T) => ImmutableSetType<T>
    items: () => T[]
}
