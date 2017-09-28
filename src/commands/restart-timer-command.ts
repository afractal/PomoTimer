import { restartTimer } from '../components/timer-component';
import { workTimer } from '../components/timers';

export const restartTimerCommand = () => {
    restartTimer(workTimer);
};
