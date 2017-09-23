import { CurrentTaskComponent } from '../components/current-task-component';
import { TaskBoardComponent } from '../components/taskboard-component';
import { TimerComponent } from '../components/timer-component';

export const startTimerCommand = async (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent,
    taskboadComponent: TaskBoardComponent) => {
    if (!currentTaskComponent.selectedTask) {
        await taskboadComponent.showTaskboard();
    } else {
        timerComponent.startTimer();
    }
};
