import { hasTaskAssigned } from '../components/current-task-component';
import { showTaskboard, } from '../components/taskboard-component';
import { startTimer } from '../components/timer-component';
import { breakTimer } from '../components/timers';

export const startBreakTimerCommand = async () => {
    startTimer(breakTimer);
};
