import { TimerComponent } from '../components/timer-component';

export const resumeTimerCommand = (timerComponent: TimerComponent) => {
    timerComponent.resumeTimer();
};
