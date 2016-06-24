class MemoryStore {
	constructor(items = []) {
		this._maxId = 0;
		this._items = [];

		items.forEach((item) => {
			this._addSync(item);
		});
	}

	getAll(cb) {
		process.nextTick(() => {
			cb(null, this._items.concat([]));
		});
	}

	add(item, cb) {
		process.nextTick(() => {
			cb(null, this._addSync(item));
		});
	}

	getById(id, cb) {
		process.nextTick(() => {
			const idx = this._findIndexOrReportError(id);
			if (idx === -1) {
				return;
			}

			cb(null, this._items[idx]);
		});
	}

	update(id, item, cb) {
		process.nextTick(() => {
			const idx = this._findIndexOrReportError(id);
			if (idx === -1) {
				return;
			}

			this._items[idx] = item;
			cb(null, item);
		});
	};

	remove(id, cb) {
		process.nextTick(() => {
			const idx = this._findIndexOrReportError(id);
			if (idx === -1) {
				return;
			}

			const item = this._items.splice(idx, 1);
			cb(null, item)
		});
	};

	_findIndexOrReportError(id, cb) {
		const idx = this._items.findIndex((item) => item.id === id);
		if (idx === -1) {
			const err = new Error(`Item with id ${id} not found`);
			err.name = 'ItemNotFound';
			cb(err);
		}

		return idx;
	}

	_addSync(item) {
		item.id = ++this._maxId;
		this._items.push(item);
		return item;
	}
}

module.exports = MemoryStore;