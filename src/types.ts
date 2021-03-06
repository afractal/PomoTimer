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
    kind: 'add' | 'mark' | 'remove' | 'choose' | 'reset'
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
}

export type WorkTimerType = BaseTimer & { kind: 'work' }

export type BreakTimerType = BaseTimer & { kind: 'break' }

export type TimerType = WorkTimerType | BreakTimerType

export interface ITimerState {
    display(): ITimerState
    start(): ITimerState
    pause(): ITimerState
    resume(): ITimerState
    restart(): ITimerState
    hide(): ITimerState

    getState(): TimerStates
    getVisibilityState(): TimerVisibilityStates
    getTimerMode(): TimerMode
    changeTimerMode(timerObj: Timer): ITimerState
}

export type TimerMode = 'work' | 'break' | undefined

export type TimerStates = 'unstarted' | 'running' | 'paused' //  | 'elapsed'

export type TimerVisibilityStates = 'hidden' | 'visible' | undefined

export type ImmutableSetType<T> = {
    add: (item: T) => ImmutableSetType<T>
    remove: (item: T) => ImmutableSetType<T>
    update: (item: T, updateFn: (item: T) => void) => ImmutableSetType<T>
    items: () => T[]
}
