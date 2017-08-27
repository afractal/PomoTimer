import { QuickPickItem } from 'vscode';
import { Task } from "./task";

export interface TaskPick extends QuickPickItem {
    task: Task;
}


