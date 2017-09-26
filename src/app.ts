import { ExtensionContext } from 'vscode';
import * as TaskStore from './services/task-store';
import { registerCommands } from './register-commands';
import { registerEvents } from './register-events';

export const createApp = async (context: ExtensionContext) => {
    TaskStore.init(context.globalState);

    await registerEvents(context);
    await registerCommands(context);
};


