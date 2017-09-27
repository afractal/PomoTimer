import { Memento } from 'vscode';
import { Task } from '../types/task';

const mementoKey = 'tasks';

type TaskStore = {
    memento: Memento;
};

let taskStore: TaskStore;

export const init = (memento: Memento) => {
    taskStore = {
        memento: memento
    };
};

export const getTasks = () => {
    return taskStore.memento.get<Task[]>(mementoKey, new Array<Task>()) as Task[];
};

export const insertAsync = async (task: Task) => {
    const tasks = getTasks().concat(task);
    const values = new Set<Task>(tasks).values();

    await taskStore.memento.update(mementoKey, [...values]);
};

export const updateAsync = async (task: Task) => {
    const tasks = getTasks()
        .map(t => {
            const completedPomodori = t.name == task.name ?
                task.completedPomodori :
                t.completedPomodori;

            return Object.assign({}, t, {
                completedPomodori: completedPomodori
            });
        });

    await taskStore.memento.update(mementoKey, tasks);
};

export const removeAsync = async (taskName: string) => {
    const tasks = getTasks().filter(t => t.name !== taskName);
    const values = new Set<Task>(tasks).values();

    await taskStore.memento.update(mementoKey, [...values]);
};

export const removeAllAsync = async () => {
    await taskStore.memento.update(mementoKey, []);
};

