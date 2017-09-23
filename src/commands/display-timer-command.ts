import { TimerComponent } from '../components/timer-component';
import { CurrentTaskComponent } from '../components/current-task-component';

export const displayTimerCommand = (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    timerComponent.displayTimer();
    currentTaskComponent.displayCurrentTask();
};
