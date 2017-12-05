// import { WorkTimer } from "../types/timer-kind";
// import { Messages } from "../types/messages";

// export type TimerState =
//     | UnstartedTimerState
//     | RunningTimerState
//     | PausedTimerState
//     | ElapsedTimerState

// type UnstartedTimerState = {
//     kind: 'unstarted';
//     startTimer: (timer: WorkTimer) => RunningTimerState;
// };

// type RunningTimerState = {
//     kind: 'running';
//     pauseTimer: (timer: WorkTimer) => PausedTimerState;
// };

// type PausedTimerState = {
//     kind: 'paused';
//     startTimer: (timer: WorkTimer) => RunningTimerState;
// };

// type ElapsedTimerState = {
//     kind: 'elapsed';
//     restartTimer: (timer: WorkTimer) => UnstartedTimerState;
// };

// const UnstartedTimer: UnstartedTimerState = {
//     kind: 'unstarted',
//     startTimer: (timer: WorkTimer) => {
//         timer.timer.start();
//         timer.statusBarAction.command = 'pomotimer.pauseTimer';
//         timer.statusBarAction.text = '$(triangle-right)';
//         timer.statusBarAction.tooltip = 'Pause timer';
//         return RunningTimer;
//     }
// };

// const RunningTimer: RunningTimerState = {
//     kind: 'running',
//     pauseTimer: (timer: WorkTimer) => {
//         timer.timer.pause();
//         timer.statusBarAction.command = 'pomotimer.resumeTimer';
//         timer.statusBarAction.text = '$(triangle-right)';
//         timer.statusBarAction.tooltip = 'Resume timer';
//         timer.statusBarClock.text = timer.timer.toString();
//         return PausedTimer;
//     }
// };

// const PausedTimer: PausedTimerState = {
//     kind: 'paused',
//     startTimer: (timer: WorkTimer) => {
//         timer.timer.pause();
//         timer.statusBarAction.command = 'pomotimer.resumeTimer';
//         timer.statusBarAction.text = '$(triangle-right)';
//         timer.statusBarAction.tooltip = 'Resume timer';
//         timer.statusBarClock.text = timer.timer.toString();
//         return RunningTimer;
//     }
// };

// const ElapsedTimer: ElapsedTimerState = {
//     kind: 'elapsed',
//     restartTimer: (timer: WorkTimer) => {
//         timer.statusBarAction.command = 'pomotimer.restartTimer';
//         timer.statusBarAction.text = '$(sync)';
//         timer.statusBarAction.tooltip = 'Restart timer';
//         timer.statusBarClock.text = timer.timer.toString();
//         timer.timer.stop();
//         timer.emitter.emit(Messages.TimerElapsed);
//         return UnstartedTimer;
//     }
// };


