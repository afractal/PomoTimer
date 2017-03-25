import { equal } from 'assert';
import * as pomotimer from '../src/extension';

suite("extension tests", () => {
    test("Something 1", () => {
        equal(-1, [1, 2, 3].indexOf(5));
        equal(-1, [1, 2, 3].indexOf(0));
    });
});