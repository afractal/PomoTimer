import { pauseTimer } from '../components/timer-component';
import { breakTimer } from '../components/timers';

export const pauseBreakTimerCommand = () => {
    pauseTimer(breakTimer);
};
