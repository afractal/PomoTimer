import { workspace } from 'vscode';

const config = workspace.getConfiguration('pomotimer');

export const pomodoroSizeInMinutes = 1; // config.get<number>('workTime') || 25;
export const breakSizeInMinutes = 2; //config.get<number>('breakTime') || 5;



