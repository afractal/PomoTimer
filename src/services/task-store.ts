import { Memento, ExtensionContext } from 'vscode';
import { Task } from '../types/task';

const mementoKey = 'tasks';
type TaskStore = {
    readonly memento: Memento;
};

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

export const insertNewAsync = async (task: Task) => {
    const tasks = ImmutableSet(getTasks()).add(task).items();
    await taskStore.memento.update(mementoKey, tasks);
};

export const updateAsync = async (task: Task) => {
    const tasks = getTasks().map(updatePomodori(task));
    await taskStore.memento.update(mementoKey, tasks);
};

const updatePomodori = (newTask: Task) => {
    return (task: Task) => {
        const completedPomodori = (task.name == task.name) ?
            newTask.completedPomodori :
            task.completedPomodori;

        return {
            ...task,
            completedPomodori: completedPomodori
        };
    };
};

export const removeAsync = async (task: Task) => {
    const tasks = ImmutableSet(getTasks()).remove(task).items();
    await taskStore.memento.update(mementoKey, tasks);
};

export const removeAllAsync = async () => {
    await taskStore.memento.update(mementoKey, []);
};


type ImmutableSet<T> = {
    add: (item: T) => ImmutableSet<T>;
    remove: (item: T) => ImmutableSet<T>;
    items: () => T[];
};

const ImmutableSet = (collection: Task[]): ImmutableSet<Task> => {
    let items = new Array<Task>(...collection);

    const contains = (item: Task) =>
        items.some(x => x.name == item.name);

    return {
        add(item: Task): ImmutableSet<Task> {
            if (!contains(item))
                items.push(item);

            return this;
        },
        remove(item: Task): ImmutableSet<Task> {
            if (contains(item))
                items = items.filter(x => x.name != item.name);

            return this;
        },
        items(): Task[] {
            return items;
        }
    };
};
