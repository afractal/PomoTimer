import { displayTimer } from '../components/timer-component';
import { displayCurrentTask } from '../components/current-task-component';
import { workTimer } from '../components/timers';

export const displayTimerCommand = () => {
    displayTimer(workTimer);
    displayCurrentTask();
};
