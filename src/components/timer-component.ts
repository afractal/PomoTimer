import { Timer } from 'sharp-timer';
import { CommandMappingsEnum } from '../types/command-mappings';
import { Messages } from '../types/messages';
import { TimerKind } from '../types/timer-kind';
import { pomodoroSizeInMinutes, breakSizeInMinutes } from '../services/configuration-manager';

/*
    initial state -> can only start
    running state -> can pause and restart
    paused state -> can start and restart
    type TM = UnstartedTimer | RunningTimer | PausedTimer | ElapsedTimer;
*/

type ListerDelegate = () => void;

export const onTimerElapsing = (timerComponent: TimerKind, listener: ListerDelegate) => {
    switch (timerComponent.kind) {
        case 'work':
            timerComponent.emitter.on(Messages.TimerElapsing, listener);
            break;
        case 'break':
            timerComponent.emitter.on(Messages.BreakTimerElapsing, listener);
            break;
    }
};

export const onTimerElapsed = (timerComponent: TimerKind, listener: ListerDelegate) => {
    switch (timerComponent.kind) {
        case 'work':
            timerComponent.emitter.on(Messages.TimerElapsed, listener);
            break;
        case 'break':
            timerComponent.emitter.on(Messages.BreakTimerElapsed, listener);
            break;
    }
};

export const displayTimer = (timerComponent: TimerKind) => {
    switch (timerComponent.kind) {
        case 'work':
            timerComponent.statusBarAction.command =
                // timerComponent.statusBarAction.command ||
                CommandMappingsEnum.StartTimer;
            break;
        case 'break':
            timerComponent.statusBarAction.command = //timerComponent.statusBarAction.command ||
                CommandMappingsEnum.StartBreakTimer;
            break;
    }
    timerComponent.statusBarAction.text = timerComponent.statusBarAction.text || '$(triangle-right)';
    timerComponent.statusBarAction.tooltip = timerComponent.statusBarAction.tooltip || 'Start timer';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;

    hookUpEvents(timerComponent);

    timerComponent.statusBarClock.show();
    timerComponent.statusBarAction.show();
};

export const startTimer = (timerComponent: TimerKind) => {
    if (timerComponent.isRunning) return;

    timerComponent.isRunning = true;
    timerComponent.timer.start();

    switch (timerComponent.kind) {
        case 'work':
            timerComponent.statusBarAction.command = CommandMappingsEnum.PauseTimer;
            break;
        case 'break':
            timerComponent.statusBarAction.command = CommandMappingsEnum.PauseBreakTimer;
            break;
    }

    timerComponent.statusBarAction.tooltip = 'Pause timer';
};

export const pauseTimer = (timerComponent: TimerKind) => {
    timerComponent.timer.pause();
    timerComponent.statusBarAction.command = CommandMappingsEnum.ResumeTimer;
    timerComponent.statusBarAction.tooltip = 'Start timer';
    timerComponent.statusBarAction.text = '$(triangle-right)';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
};

export const resumeTimer = (timerComponent: TimerKind) => {
    timerComponent.timer.resume();
    timerComponent.statusBarAction.command = CommandMappingsEnum.PauseTimer;
    timerComponent.statusBarAction.tooltip = 'Pause timer';
};

export const restartTimer = (timerComponent: TimerKind) => {
    timerComponent.timer.stop();
    timerComponent.isRunning = false;

    switch (timerComponent.kind) {
        case 'work':
            timerComponent.timer = new Timer(pomodoroSizeInMinutes * 60);
            break;
        case 'break':
            timerComponent.timer = new Timer(breakSizeInMinutes * 60);
            break;
    }

    resetUi(timerComponent);
    hookUpEvents(timerComponent);
};

export const hideTimer = (timerComponent: TimerKind) => {
    timerComponent.statusBarAction.hide();
    timerComponent.statusBarClock.hide();
};

export const destroyTimer = (timerComponent: TimerKind) => {
    switch (timerComponent.kind) {
        case 'work':
            timerComponent.timer = new Timer(pomodoroSizeInMinutes * 60);
            break;
        case 'break':
            timerComponent.timer = new Timer(breakSizeInMinutes * 60);
            break;
    }
};


const resetUi = (timerComponent: TimerKind) => {
    switch (timerComponent.kind) {
        case 'work':
            timerComponent.statusBarAction.command = CommandMappingsEnum.StartTimer;
            break;
        case 'break':
            timerComponent.statusBarAction.command = CommandMappingsEnum.StartBreakTimer;
            break;
    }

    timerComponent.statusBarAction.text = '$(triangle-right)';
    timerComponent.statusBarAction.tooltip = 'Start timer';
    timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
};

const hookUpEvents = (timerComponent: TimerKind) => {
    timerComponent.timer.onIntervalElapsing((_: number) => {
        timerComponent.statusBarAction.text = '$(primitive-square)';
        timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
        switch (timerComponent.kind) {
            case 'work':
                timerComponent.emitter.emit(Messages.TimerElapsing);
                break;
            case 'break':
                timerComponent.emitter.emit(Messages.BreakTimerElapsing);
                break;
        }
    });

    timerComponent.timer.onIntervalElapsed(() => {
        // switch (timerComponent.kind) {
        //     case 'work':
        //         timerComponent.statusBarAction.command = CommandMappingsEnum.RestartTimer;
        //         break;
        //     case 'break':
        //         timerComponent.statusBarAction.command = CommandMappingsEnum.RestartBreakTimer;
        //         break;
        // }

        // timerComponent.statusBarAction.text = '$(sync)';
        // timerComponent.statusBarAction.tooltip = 'Restart timer';
        // timerComponent.statusBarClock.text = `${timerComponent.timer.toString()}`;
        // timerComponent.timer.stop();

        switch (timerComponent.kind) {
            case 'work':
                timerComponent.emitter.emit(Messages.TimerElapsed);
                break;
            case 'break':
                timerComponent.emitter.emit(Messages.BreakTimerElapsed);
                break;
        }
    });
};
