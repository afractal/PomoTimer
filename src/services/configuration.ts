import { workspace } from 'vscode';
import * as process from 'process';

type Env = 'dev' | 'prod'

const defaultPomodoroSize = 25;
const defaultBreakSize = 5;
const defaultShouldDisplayTimerOnApplicationStart = false;

const devPomodoroSize = 0.1;
const devBreakSize = 0.2;
const devShouldDisplayTimerOnApplicationStart = false;

const getConfig = () =>
    workspace.getConfiguration('pomotimer');

const getConfigWorkTime = () =>
    getConfig().get<number>('workTime', defaultPomodoroSize);

const getConfigBreakTime = () =>
    getConfig().get<number>('breakTime', defaultBreakSize);

const getConfigShouldDisplayTimerOnApplicationStart = () =>
    getConfig().get<boolean>('shouldDisplayTimerOnApplicationStart', defaultShouldDisplayTimerOnApplicationStart);

const envify = (obj: any) => obj as Env;

const pomoTimerEnv = process.env['POMOTIMER_ENV'] || 'prod';
const env: Env = envify(pomoTimerEnv);

export const getPomodoroSizeInMinutes = () =>
    (env == 'dev') ? devPomodoroSize : getConfigWorkTime();

export const getBreakSizeInMinutes = () =>
    (env == 'dev') ? devBreakSize : getConfigBreakTime();

export const shouldDisplayTimerOnApplicationStart = () =>
    (env == 'dev') ? devShouldDisplayTimerOnApplicationStart : getConfigShouldDisplayTimerOnApplicationStart();






