import * as assert from 'assert';
import { activate } from '../src/extension';
import { commands } from 'vscode';

suite('extension tests', () => {
    test("test if commands exists", (done) => {
        let p1 = commands.getCommands().then(cmds => {
            let hasOneWithUnderscore = false;
            for (let command of cmds) {
                if (command[0] === '_') {
                    hasOneWithUnderscore = true;
                    break;
                }
            }
            assert.ok(hasOneWithUnderscore);
        }, done);


        Promise.all([p1]).then(() => {
            done();
        });
    });



});