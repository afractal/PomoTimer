namespace PomoTimer {

    export interface ITaskStore {
        getTasks(): Array<Task>;
        insertAsync(task: Task): Promise<void>;
        updateAsync(task: Task): Promise<void>;
        removeAsync(taskName: string): Promise<void>;
        removeAllAsync(): Promise<void>;
    }
}
