import { MessagingCenter } from "../services/messaging-center";
import { WorkTimer, Messages } from "../types";
import { createTimerForWork } from '../components/creators';

export const registerTimerEvents = (timerObj: WorkTimer) => {
    timerObj.timer = createTimerForWork();

    timerObj.timer.onIntervalElapsing((_: number) => {
        timerObj.statusBarClock.text = timerObj.timer.toString();

        MessagingCenter.publish(Messages.TimerElapsing, null);
    });

    timerObj.timer.onIntervalElapsed(() => {
        timerObj.statusBarAction.command = 'pomotimer.restartTimer';
        timerObj.statusBarAction.text = '$(sync)';
        timerObj.statusBarAction.tooltip = 'Restart timer';

        timerObj.statusBarClock.text = timerObj.timer.toString();

        timerObj.timer.stop();

        MessagingCenter.publish(Messages.TimerElapsed, null);
    });
};





