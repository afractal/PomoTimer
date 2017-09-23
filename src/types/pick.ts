namespace PomoTimer {

    export interface Pick extends IQuickPickItem {
        kind: 'add' | 'mark' | 'remove' | 'choose';
    }
}
