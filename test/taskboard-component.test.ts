import { commands, Disposable } from "vscode";
import { assert } from 'chai';
import { initTaskBoard } from '../src/taskboard-component';

suite('taskboard component tests', () => {
    let taskboardCommand: Disposable;
    const beforeEach = () => {
        taskboardCommand = commands.registerCommand('pomotimer.displayTaskboard', async () => {
            await initTaskBoard();
        });
    };

    test('should register displayTaskboard successfully', async () => {
        beforeEach();

        return new Promise(async (resolve, reject) => {
            try {
                const cmds = await commands.getCommands(true);
                assert.ok(cmds.includes('pomotimer.displayTaskboard'));
                taskboardCommand.dispose();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });






});
