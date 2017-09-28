import { pauseTimer } from '../components/timer-component';
import { workTimer } from '../components/timers';

export const pauseTimerCommand = () => {
    pauseTimer(workTimer);
};
