import CommandMappings = PomoTimer.CommandMappings;
import { ExtensionContext, commands } from "vscode";

import { displayTaskboardCommand } from './commands/display-taskboard-command';
import { displayTimerCommand } from './commands/display-timer-command';
import { hideTimerCommand } from './commands/hide-timer-command';
import { pauseTimerCommand } from './commands/pause-timer-command';
import { restartTimerCommand } from './commands/restart-timer-command';
import { resumeTimerCommand } from './commands/resume-timer-command';
import { startTimerCommand } from './commands/start-timer-command';

type Cmd = {
    commandName: keyof Readonly<CommandMappings>
    commandHandler: Function
};

export const registerCommands = async (context: ExtensionContext) => {
    const allCommands: CommandMappings = {
        'pomotimer.displayTimer': displayTimerCommand,
        'pomotimer.startTimer': startTimerCommand,
        'pomotimer.pauseTimer': pauseTimerCommand,
        'pomotimer.resumeTimer': resumeTimerCommand,
        'pomotimer.restartTimer': restartTimerCommand,
        'pomotimer.hideTimer': hideTimerCommand,
        'pomotimer.displayTaskboard': displayTaskboardCommand,
        'pomotimer.startBreakTimer': Function
    };

    for (const [commandName, commandHandler] of Object.entries(allCommands)) {
        const registeredCommand = commands.registerCommand(commandName, commandHandler);
        context.subscriptions.push(registeredCommand);
    }
};

