import { assert } from 'chai';
import { workspace, commands } from 'vscode';
import { TimerComponent } from '../src/timer-component';


const config = workspace.getConfiguration('pomotimer')
let configMinutes = config.get<number>('workTime');
let timerComponent = new TimerComponent(
    configMinutes || 20,
    'pomotimer.startTimer',
    'pomotimer.restartTimer'
);

suite('commands tests', () => {
    test("should test if commands exists", () => {
        return new Promise(async (resolve, reject) => {
            const cmds = await commands.getCommands(true);
            const userDefinedCommands = cmds.filter(c => !c.startsWith('_'));
            try {
                assert.ok(userDefinedCommands.length > 0);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

    test('should test displayTimer command', () => {
        return new Promise(async (resolve, reject) => {
            const r = await commands.executeCommand('pomotimer.displayTimer');
            try {
                assert.isUndefined(r);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

});
