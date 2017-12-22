import { workspace } from 'vscode';
import * as process from 'process';

type Env = 'dev' | 'prod'

const defaultPomodoroSize = 25;
const defaultBreakSize = 5;
const defaultShouldDisplayTimerOnApplicationStart = false;
const devPomodoroSize = 1;
const devBreakSize = 2;
const devShouldDisplayTimerOnApplicationStart = false;

const config = workspace.getConfiguration('pomotimer');

const configWorkTime =
    config.get<number>('workTime', defaultPomodoroSize);

const configBreakTime =
    config.get<number>('breakTime', defaultBreakSize);

const configShouldDisplayTimerOnApplicationStart =
    config.get<boolean>('shouldDisplayTimerOnApplicationStart', defaultShouldDisplayTimerOnApplicationStart);

const envify = (obj: any) => obj as Env;

const pomoTimerEnv = process.env['POMOTIMER_ENV'];
const env: Env = !!pomoTimerEnv ? envify(pomoTimerEnv) : envify('dev');

export const getPomodoroSizeInMinutes = () =>
    (env == 'prod') ? configWorkTime : devPomodoroSize;

export const getBreakSizeInMinutes = () =>
    (env == 'prod') ? configBreakTime : devBreakSize;

export const shouldDisplayTimerOnApplicationStart = () =>
    (env == 'prod') ? configShouldDisplayTimerOnApplicationStart : devShouldDisplayTimerOnApplicationStart;






