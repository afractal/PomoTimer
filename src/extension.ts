import { ExtensionContext } from 'vscode';
import { createApp } from './app';
import { createStore, configureStore } from "./services/task-store";

export const activate = async (context: ExtensionContext) => {
    configureStore(createStore(context));
    await createApp(context);
};

export const deactivate = () => { };

