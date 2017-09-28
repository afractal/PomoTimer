import { ExtensionContext, commands } from "vscode";
import { displayTaskboardCommand } from './commands/display-taskboard-command';
import { displayTimerCommand } from './commands/display-timer-command';
import { hideTimerCommand } from './commands/hide-timer-command';
import { pauseTimerCommand } from './commands/pause-timer-command';
import { restartTimerCommand } from './commands/restart-timer-command';
import { resumeTimerCommand } from './commands/resume-timer-command';
import { startTimerCommand } from './commands/start-timer-command';
import { CommandMappings } from "./types/command-mappings";
import { restartBreakTimerCommand } from "./commands/restart-break-timer-command";
import { startBreakTimerCommand } from "./commands/start-break-timer-command";
import { pauseBreakTimerCommand } from "./commands/pause-break-timer-command";

export const registerCommands = async (context: ExtensionContext) => {
    const allCommands: CommandMappings = {
        'pomotimer.displayTimer': displayTimerCommand,
        'pomotimer.startTimer': startTimerCommand,
        'pomotimer.startBreakTimer': startBreakTimerCommand,
        'pomotimer.pauseTimer': pauseTimerCommand,
        'pomotimer.pauseBreakTimer': pauseBreakTimerCommand,
        'pomotimer.resumeTimer': resumeTimerCommand,
        'pomotimer.restartTimer': restartTimerCommand,
        'pomotimer.restartBreakTimer': restartBreakTimerCommand,
        'pomotimer.hideTimer': hideTimerCommand,
        'pomotimer.displayTaskboard': displayTaskboardCommand
    };

    for (const [commandName, commandHandler] of Object.entries(allCommands)) {
        const registeredCommand = commands.registerCommand(commandName, commandHandler);
        context.subscriptions.push(registeredCommand);
    }
};

