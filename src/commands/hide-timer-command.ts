import { hideTimer } from '../components/timer-component';
import { hideCurrentTask } from '../components/current-task-component';
import { workTimer } from '../components/timers';

export const hideTimerCommand = () => {
    hideTimer(workTimer);
    hideCurrentTask();
};
