// import { WorkTimer } from "../types/timer-kind";


// export interface ITimerState {
//     displayTimer: () => ITimerState;
//     startTimer: () => ITimerState;
//     pauseTimer: () => ITimerState;
//     resumeTimer: () => ITimerState;
//     restartTimer: () => ITimerState;
//     hideTimer: () => ITimerState;
// };


// export class UnstartedTimer implements ITimerState {
//     constructor(
//         timerObj: WorkTimer,
//         onIntervalElapsing: Function,
//         onIntervalElapsed: Function) {
//         this.timerObj = timerObj;
//         this.onIntervalElapsing = onIntervalElapsing;
//         this.onIntervalElapsed = onIntervalElapsed;
//     }

//     private timerObj: WorkTimer;
//     private onIntervalElapsing: Function;
//     private onIntervalElapsed: Function;

//     displayTimer() {
//         this.setDisplayStatusAction();
//         this.timerObj.statusBarClock.show();
//         this.timerObj.statusBarAction.show()
//         return this;
//     }

//     startTimer() {
//         return this;
//     }

//     pauseTimer: () => this;

//     resumeTimer: () => this;

//     restartTimer: () => this;

//     hideTimer: () => this;

//     private setDisplayStatusAction() {
//         this.timerObj.statusBarAction.command = 'pomotimer.startTimer';
//         this.timerObj.statusBarAction.text = '$(triangle-right)';
//         this.timerObj.statusBarAction.tooltip = 'Start timer';
//     }

//     private refreshStatusClock() {
//         this.timerObj.statusBarClock.text = this.timerObj.timer.toString();
//     }

//     private hookUpIntervalEvents() {
//         this.timerObj.timer.onIntervalElapsing = this.onIntervalElapsing;
//         this.timerObj.timer.onIntervalElapsed = this.onIntervalElapsed;
//     }
// }

