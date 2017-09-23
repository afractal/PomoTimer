import "reflect-metadata";
import { ExtensionContext } from 'vscode';
import { createApp } from './app';

export async function activate(context: ExtensionContext) {
    await createApp(context);
}

export function deactivate() { }

