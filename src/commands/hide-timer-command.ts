import { TimerComponent } from '../components/timer-component';
import { CurrentTaskComponent } from '../components/current-task-component';

export const hideTimerCommand = (timerComponent: TimerComponent,
    currentTaskComponent: CurrentTaskComponent) => {
    timerComponent.hideTimer();
    currentTaskComponent.hideCurrentTask();
};
