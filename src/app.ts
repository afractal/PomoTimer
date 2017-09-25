import { window, workspace, ExtensionContext, InputBoxOptions } from 'vscode';
import * as Timer from './components/timer-component';
import * as Taskboard from './components/taskboard-component';
import * as CurrentTask from './components/current-task-component';
import * as TaskStore from './services/task-store';
import { registerCommands } from './register-commands';
import { registerEvents } from './register-events';


export const createApp = async (context: ExtensionContext) => {
    const config = workspace.getConfiguration('pomotimer');
    const workMinutes = 1; // config.get<number>('workTime') || 25;
    const breakMinutes = 2; // config.get<number>('breakTime') || 5;

    TaskStore.init(context.globalState);
    Timer.init(workMinutes);
    Taskboard.init(context.globalState);
    CurrentTask.init(context.globalState);

    await registerEvents(context);
    await registerCommands(context);
};


