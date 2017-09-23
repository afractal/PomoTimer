import { TimerComponent } from '../components/timer-component';

export const restartTimerCommand = (timerComponent: TimerComponent) => {
    timerComponent.restartTimer();
};
