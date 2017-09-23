import { TimerComponent } from '../components/timer-component';

export const pauseTimerCommand = (timerComponent: TimerComponent) => {
    timerComponent.pauseTimer();
};
