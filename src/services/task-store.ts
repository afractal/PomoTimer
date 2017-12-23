import { Memento, ExtensionContext } from 'vscode';
import { Task } from '../types';
import { ImmutableSet } from './immutable-set';

const mementoKey = 'tasks';
type TaskStore = {
    readonly memento: Memento;
}

let taskStore: TaskStore;

export const createStore = (context: ExtensionContext): TaskStore => ({
    memento: context.globalState
});

export const configureStore = (store: TaskStore) => {
    taskStore = store;
};


export const getTasks = () => {
    return taskStore.memento.get<Task[]>(mementoKey, []);
};

export const insertNew = async (task: Task) => {
    const tasks = ImmutableSet(getTasks()).add(task).items();
    await taskStore.memento.update(mementoKey, tasks);
};

export const update = async (task: Task) => {
    const tasks = ImmutableSet(getTasks()).update(task, (foundTask) => {
        foundTask.completedPomodori = task.completedPomodori;
    }).items();

    await taskStore.memento.update(mementoKey, tasks);
};

export const reset = async (task: Task) => {
    const tasks = ImmutableSet(getTasks()).update(task, (foundTask) => {
        foundTask.completedPomodori = 0;
    }).items();

    await taskStore.memento.update(mementoKey, tasks);
};

export const remove = async (task: Task) => {
    const tasks = ImmutableSet(getTasks()).remove(task).items();
    await taskStore.memento.update(mementoKey, tasks);
};

export const removeAllAsync = async () => {
    await taskStore.memento.update(mementoKey, []);
};
