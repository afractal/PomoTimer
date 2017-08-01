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

    async removeAsync(task: Task) {
        const tasks = this.getTasks().filter(t => t.name !== task.name);
        const values = new Set<Task>(tasks).values();

        await this.memento.update(this.mementoKey, [...values]);
    }

    async removeAllAsync() {
        await this.memento.update(this.mementoKey, []);
    }
}