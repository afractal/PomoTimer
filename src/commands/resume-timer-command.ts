import { resumeTimer } from '../components/timer-component';
import { workTimer } from '../components/timers';

export const resumeTimerCommand = () => {
    resumeTimer(workTimer);
};
