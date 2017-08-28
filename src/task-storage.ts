import { Memento } from 'vscode';
import { Task } from './types/task';

export class TaskStorage {
    private readonly mementoKey = 'tasks';

    constructor(private readonly memento: Memento) { }

    getTasks() {
        return this.memento.get<Array<Task>>(this.mementoKey, []);
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