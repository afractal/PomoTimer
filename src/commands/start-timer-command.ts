import { hasTaskAssigned } from '../components/current-task-component';
import { showTaskboard } from '../components/taskboard-component';
import { startTimer } from '../components/timer-component';
import { workTimer } from '../components/timers';

export const startTimerCommand = async () => {
    if (!hasTaskAssigned()) {
        await showTaskboard();
    } else {
        startTimer(workTimer);
    }
};
