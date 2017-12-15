import { workspace } from 'vscode';
import * as process from 'process';

type Env = 'dev' | 'prod';

const config = workspace.getConfiguration('pomotimer');
const configWorkTime = config.get<number>('workTime');
const configBreakTime = config.get<number>('breakTime');

const pomoTimerEnv = process.env['POMOTIMER_ENV'];
const env = !!pomoTimerEnv ? pomoTimerEnv as Env : 'dev';

const defaultPomodoroSize = 25;
const defaultBreakSize = 5;
const devPomodoroSize = 1;
const devBreakSize = 2;

export const getPomodoroSizeInMinutes = () =>
    (env == 'prod') ?
        configWorkTime || defaultPomodoroSize :
        devPomodoroSize;

export const getBreakSizeInMinutes = () =>
    (env == 'prod') ?
        configBreakTime || defaultBreakSize :
        devBreakSize;
