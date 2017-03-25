import { equal, notEqual, notDeepStrictEqual } from 'assert';
import { Mock } from 'typemoq';
import { StatusBarAlignment } from 'vscode';
import { Timer } from '../src/timer';

suite('timer tests', () => {
    test('creates a timer with the correct defaults', () => {
        const priority = 1;
        const alignment = StatusBarAlignment.Right;
        const color = 'white';
        const timer = new Timer();

        equal(timer.statusBarItem.priority, priority, 'priority should be 1');
        equal(timer.statusBarItem.alignment, StatusBarAlignment.Right, 'alignment should be right');
        equal(timer.statusBarItem.color, color, 'color should be white');
    });

    test('creates a timer with the specified remaining minutes', () => {
        const remainingMinutes = 25;
        const remainingSeconds = 0;
        const timer = new Timer(remainingMinutes);

        equal(timer.remainingMinutes, remainingMinutes, `remainingMinutes should be ${remainingMinutes}`);
        equal(timer.remainingSeconds, remainingSeconds, `remainingMinutes should be ${remainingSeconds}`);
    });

    test('creates a timer with the specified remaining minutes and seconds', () => {
        const remainingMinutes = 25;
        const remainingSeconds = 60;
        const timer = new Timer(remainingMinutes, remainingSeconds);

        equal(timer.remainingMinutes, remainingMinutes, `remainingMinutes should be ${remainingMinutes}`);
        equal(timer.remainingSeconds, remainingSeconds, `remainingSeconds should be ${remainingSeconds}`);
    });

    test('displays the timer correctly', () => {
        const startCommand = 'pomotimer.displayTimer';
        const timer = new Timer(25, 60);
        timer.displayTimer(startCommand);
        const time = `${timer.getDoubleDigit(timer.remainingMinutes)}:${timer.getDoubleDigit(timer.remainingSeconds)}`;

        notEqual(timer.statusBarItem, null, 'statusBarItem should not be null');
        notEqual(timer.statusBarItem, undefined, 'statusBarItem should not be undefined');
        equal(timer.statusBarItem.command, startCommand, `startCommand should be ${startCommand}`);
        equal(timer.time, time, `time should be ${time}`);
    });

    test('startTimer works correctly', () => {
        const finishCommand = 'pomotimer.finishTimer';
        const durationInMinutes = 25;
        const timer = new Timer();

        timer.startTimer(finishCommand, durationInMinutes);

        notEqual(timer.statusBarItem, null, 'statusBarItem should not be null');
        notEqual(timer.statusBarItem, undefined, 'statusBarItem should not be undefined');
        equal(timer.statusBarItem.command, finishCommand, `finishCommand should be ${finishCommand}`);
    });

    test('finishTimer works correctly', () => {
        const startCommand = 'pomotimer.startTimer';
        const timer = new Timer();
        timer.finishTimer(startCommand);

        notEqual(timer.statusBarItem, null, 'statusBarItem should not be null');
        notEqual(timer.statusBarItem, undefined, 'statusBarItem should not be undefined');
        equal(timer.statusBarItem.command, startCommand, `finishCommand should be ${startCommand}`);
    });

    test('setInitalTimer works correctly', () => {
        const remainingMinutes = 25;
        const remainingSeconds = 60;
        const timer = new Timer(remainingMinutes, remainingSeconds);

        timer.setInitalTimer();

        const mins = timer.getDoubleDigit(remainingMinutes);
        const seconds = timer.getDoubleDigit(remainingSeconds);
        const time = `${mins}:${seconds}`;

        equal(timer.time, time, `time should be ${time}`);
    });

    test('getDoubleDigit works correctly', () => {
        const singleDigitNumber = 1;
        const doubleDigitNumber = 11;

        const timer = new Timer();
        const expectedSingleDigitNumber = timer.getDoubleDigit(singleDigitNumber);
        const expectedDoubleDigitNumber = timer.getDoubleDigit(doubleDigitNumber);

        equal(singleDigitNumber, expectedSingleDigitNumber, 'should return a double digit from a single digit input with weak equal');
        equal(doubleDigitNumber, expectedDoubleDigitNumber, 'should return a double digit from a double digit input with weak equal');
        notDeepStrictEqual(singleDigitNumber, expectedSingleDigitNumber, 'should return a double digit from a single digit input with strict equal');
        notDeepStrictEqual(doubleDigitNumber, expectedDoubleDigitNumber, 'should return a double digit from a double digit input with strict equal');
    });
});


