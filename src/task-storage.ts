import { Memento } from 'vscode';

export class TaskStorage {
    private readonly mementoKey = 'tasks';

    constructor(private readonly memento: Memento) { }

    getTaskNames() {
        return this.memento.get<Array<string>>(this.mementoKey, []);
    }

    async insertAsync(taskName: string) {
        const taskNames = this.getTaskNames().concat(taskName);
        const values = new Set<string>(taskNames).values();
        await this.memento.update(this.mementoKey, [...values]);
    }

    async removeAsync(taskName: string) {
        const taskNames = this.getTaskNames().filter(t => t !== taskName);
        const values = new Set<string>(taskNames).values();
        await this.memento.update(this.mementoKey, [...values]);
    }

    async removeAllAsync() {
        await this.memento.update(this.mementoKey, []);
    }
}