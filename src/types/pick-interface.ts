import { IQuickPickItem } from "./quickpick-interface";

export interface Pick extends IQuickPickItem {
    kind: 'add' | 'mark' | 'remove' | 'choose';
}
