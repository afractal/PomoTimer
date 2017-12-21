import { StatusBarItem } from "vscode";

class StatusBarItemBuilder {
    constructor(private statusBarItem: StatusBarItem) { }

    withCommand(command: string): this {
        this.statusBarItem.command = command;
        return this;
    }

    withText(text: string): this {
        this.statusBarItem.text = text;
        return this;
    }

    withTooltip(tooltip: string): this {
        this.statusBarItem.tooltip = tooltip;
        return this;
    }

    build() {
        return this.statusBarItem;
    }
}
