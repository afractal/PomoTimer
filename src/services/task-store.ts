import { Memento } from 'vscode';
import Task = PomoTimer.Task;
import ITaskStore = PomoTimer.ITaskStore;

export class TaskStore implements ITaskStore {
    private readonly mementoKey = 'tasks';

    constructor(private readonly memento: Memento) { }

    getTasks(): Array<Task> {
        type TaskArray = Array<Task>;
        return this.memento.get<TaskArray>(this.mementoKey, new Array<Task>()) as TaskArray;
    }

    async insertAsync(task: Task) {
        const tasks = this.getTasks().concat(task);
        const values = new Set<Task>(tasks).values();

        await this.memento.update(this.mementoKey, [...values]);
    }

    async updateAsync(task: Task) {
        const tasks = this.getTasks()
            .map(t => {
                if (t.name == task.name) {
                    t.completedPomodori = task.completedPomodori;
                }
                return t;
            });

        await this.memento.update(this.mementoKey, tasks);
    }

    async removeAsync(taskName: string) {
        const tasks = this.getTasks().filter(t => t.name !== taskName);
        const values = new Set<Task>(tasks).values();

        await this.memento.update(this.mementoKey, [...values]);
    }

    async removeAllAsync() {
        await this.memento.update(this.mementoKey, []);
    }
}
