import { restartTimer } from '../components/timer-component';
import { breakTimer } from '../components/timers';

export const restartBreakTimerCommand = () => {
    restartTimer(breakTimer);
};
