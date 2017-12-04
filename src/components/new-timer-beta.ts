import { WorkTimer } from "../types/timer-kind";


type TimerState =
    | UnstartedTimerState
    | RunningTimerState
    | PausedTimerState
    | ElapsedTimerState



type UnstartedTimerState = {
    kind: 'unstarted';
    startTimer: (timer: WorkTimer) => RunningTimerState;
};

type RunningTimerState = {
    kind: 'running';
    pauseTimer: () => PausedTimerState;
};

type PausedTimerState = {
    kind: 'paused';
    startTimer: () => RunningTimerState;
};

type ElapsedTimerState = {
    kind: 'elapsed';
    restartTimer: () => UnstartedTimerState;
};

const UnstartedTimer: UnstartedTimerState = {
    kind: 'unstarted',
    startTimer: (timer: WorkTimer) => {
        timer.timer.start();
        timer.statusBarAction.command = 'pomotimer.pauseTimer';
        timer.statusBarAction.text = '$(triangle-right)';
        timer.statusBarAction.tooltip = 'Pause timer';
        return RunningTimer;
    }
};

const RunningTimer: RunningTimerState = {
    kind: 'running',
    pauseTimer: () => {
        return PausedTimer;
    }
};

const PausedTimer: PausedTimerState = {
    kind: 'paused',
    startTimer: () => {
        return RunningTimer;
    }
};

const ElapsedTimer: ElapsedTimerState = {
    kind: 'elapsed',
    restartTimer: () => {
        return UnstartedTimer;
    }
};


