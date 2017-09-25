import { displayTimer } from '../components/timer-component';
import { displayCurrentTask } from '../components/current-task-component';

export const displayTimerCommand = () => {
    displayTimer();
    displayCurrentTask();
};
