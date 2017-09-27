import { hasTaskAssigned } from '../components/current-task-component';
import { showTaskboard } from '../components/taskboard-component';
import { startTimer } from '../components/timer-component';

export const startTimerCommand = async () => {
    if (!hasTaskAssigned) {
        await showTaskboard();
    } else {
        startTimer();
    }
};
