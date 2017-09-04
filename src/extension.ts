import { ExtensionContext } from 'vscode';
import { createApp } from './app';

export function activate(context: ExtensionContext) {
    createApp(context);
}

export function deactivate() { }
