import { IQuickPickItem } from "./quickpick-interface";
import { Task } from "./task";

export interface TaskPick extends IQuickPickItem {
    task: Task;
}

