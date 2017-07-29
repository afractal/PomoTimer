type MessageDelegate = () => void;

export class MessagingCenter {
    private static _cache = new Map<string, Array<MessageDelegate>>();

    static publish(id: string) {
        this.throwIfEmpty(id);

        if (!this._cache.has(id)) return;

        const delegates = this.getDelegates(id);
        for (const delegate of delegates) {
            delegate();
        }
    }

    static subscribe(id: string, func: MessageDelegate) {
        this.throwIfEmpty(id);

        if (!this._cache.has(id)) {
            this._cache.set(id, [func]);
        }
        else {
            const delegates = this.getDelegates(id);
            this._cache.set(id, delegates.concat(func));
        }
    }

    static unsubscribe(id: string) {
        this.throwIfEmpty(id);

        this._cache.delete(id);
    }

    private static throwIfEmpty(id: string) {
        if (id.trim() === '')
            throw Error(`id cannot be empty`);
    }

    private static getDelegates(id: string) {
        return this._cache.get(id) || [];
    }
}

