import * as assert from 'assert';
import { workspace } from 'vscode';

suite('configuration tests', () => {
    test('check default configurations', () => {
        const expectedDefaultWorkTime = 20;
        const expectedDefaultBreakTime = 5;

        const config = workspace.getConfiguration('pomotimer');
        const defaultWorkTime = config.get<number>('workTime');
        const defaultBreakTime = config.get<number>('breakTime');

        assert.deepEqual(defaultWorkTime, expectedDefaultWorkTime);
        assert.deepEqual(defaultBreakTime, expectedDefaultBreakTime);
    });
});