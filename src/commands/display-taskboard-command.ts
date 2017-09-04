import { commands } from 'vscode';
import { Commands } from '../types/command-defs';
import { TaskBoardComponent } from '../taskboard-component';

export const displayTaskboardCommand = (taskboadComponent: TaskBoardComponent) => {
    return commands.registerCommand(Commands.DisplayTaskboard, async () => {
        await taskboadComponent.showTaskboard();
    });
};



