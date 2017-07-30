import { assert } from 'chai';

import { MessagingCenter } from '../src/messaging-center';

suite('messaging center tests', () => {
    suite('subscribe tests', () => {
        test('should throw if passed in an empty id into subscribe', () => {
            assert.throws(() => MessagingCenter.subscribe('', () => { }));
        });
    });

    suite('publish tests', () => {
        test('should throw if passed in an empty id into publish', () => {
            assert.throws(() => MessagingCenter.publish('', null));
        });

        test('should call the function passed in from subscribe', () => {
            let called = false;

            MessagingCenter.subscribe('call_test', () => called = true);
            MessagingCenter.publish('call_test', null);

            assert.isTrue(called);
        });

        test('should call multiple functions passed in from subscribe', () => {
            let called1 = false,
                called2 = false,
                called3 = false;

            MessagingCenter.subscribe('call_test', () => called1 = true);
            MessagingCenter.subscribe('call_test', () => called2 = true);
            MessagingCenter.subscribe('call_test', () => called3 = true);
            MessagingCenter.publish('call_test', null);

            assert.isTrue(called1);
            assert.isTrue(called2);
            assert.isTrue(called3);
        });
    });

    suite('unsubscribe tests', () => {
        test('should throw if passed in an empty id into unsubscribe', () => {
            assert.throws(() => MessagingCenter.unsubscribe(''));
        });

        test('should not call function passed in from subscribe after unsubscription', () => {
            let called = false;

            MessagingCenter.subscribe('call_test', () => called = true);
            MessagingCenter.unsubscribe('call_test');
            MessagingCenter.publish('call_test', null);

            assert.isFalse(called);
        });

        test('should not call any function passed in from subscribe after unsubscription', () => {
            let called1 = false,
                called2 = false,
                called3 = false;

            MessagingCenter.subscribe('call_test', () => called1 = true);
            MessagingCenter.subscribe('call_test', () => called2 = true);
            MessagingCenter.subscribe('call_test', () => called3 = true);
            MessagingCenter.unsubscribe('call_test');
            MessagingCenter.publish('call_test', null);

            assert.isFalse(called1);
            assert.isFalse(called2);
            assert.isFalse(called3);
        });
    });
});

