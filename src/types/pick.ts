import { QuickPickItem } from 'vscode';

export interface Pick extends QuickPickItem {
    kind: 'add' | 'mark' | 'remove' | 'choose';
}