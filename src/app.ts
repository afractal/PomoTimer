import { ExtensionContext } from 'vscode';
import { registerAllCommands } from './commands/all-commands';

export const createApp = async (context: ExtensionContext) => {
  registerAllCommands(context);
};


