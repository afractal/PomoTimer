import { Task, ImmutableSetType } from "../types";

export const ImmutableSet = (collection: Task[]): ImmutableSetType<Task> => {
    let items = new Array<Task>(...collection);

    const contains = (item: Task) =>
        items.some(x => x.name == item.name);

    return {
        add(item: Task): ImmutableSetType<Task> {
            if (!contains(item))
                items.push(item);

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
