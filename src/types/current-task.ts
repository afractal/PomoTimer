import { Task } from "./task";
import { StatusBarItem } from "vscode";
import { EventEmitter } from "events";

export type CurrentTask = {
    selectedTask: Task | null;
    statusBarSelectedTask: StatusBarItem;
};
