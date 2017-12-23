import { Task, ImmutableSetType } from "../types";

export const ImmutableSet = (collection: Task[]): ImmutableSetType<Task> => {
    let items = new Array<Task>(...collection);

    const getOtherTasks = (item: Task) =>
        items.filter(i => i.name != item.name);

    const findTask = (item: Task) =>
        items.find(x => x.name == item.name);

    const contains = (item: Task) =>
        findTask(item) != undefined;

    return {
        add(item: Task): ImmutableSetType<Task> {
            if (!contains(item))
                items.push(item);

            return this;
        },
        update(item: Task, updateFn: (item: Task) => void): ImmutableSetType<Task> {
            if (contains(item)) {
                const otherTasks = getOtherTasks(item);
                const task = findTask(item);
                updateFn(task!);
                items = [task!, ...otherTasks];
            }
            return this;
        },
        remove(item: Task): ImmutableSetType<Task> {
            if (contains(item))
                items = items.filter(x => x.name != item.name);

            return this;
        },
        items(): Task[] {
            return items;
        }
    };
};
