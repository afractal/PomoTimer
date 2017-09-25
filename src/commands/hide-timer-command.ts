import { hideTimer } from '../components/timer-component';
import { hideCurrentTask } from '../components/current-task-component';

export const hideTimerCommand = () => {
    hideTimer();
    hideCurrentTask();
};
