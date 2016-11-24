
class MemoryStore {

  constructor(data = [], idStrategy = 'increment', resetIds = true, idField = 'id') {
    this._data = [];
    this._resetIds = resetIds;
    this._idStrategy = idStrategy;
    this._maxId = 0;
    this._idField = idField;

    data.forEach(this._addSync.bind(this));
	}

	getAll() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(this._data.concat([]));
			}, 1);
		});
	}

	add(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					resolve(this._addSync(item));
				} catch (e) {
					reject(e);
				}
			}, 1);
		});
	}

	find(id) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const value = this._findItemByIdSync(id);
				resolve(value);
			});
		});
	}

	update(item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
			  const id = item[this._idField];
				const index = this._findIndexByIdSync(id);

				if (index === -1) {
					reject(Error(`Could not find item with id ${id}`));
					return;
				}

				this._data[index] = item;
				resolve(item);
			});
		});
	}

	remove(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const index = this._findIndexByIdSync(id);
				if (index === -1) {
					reject(Error('Could not find item'));
					return;
				}

				const item = this._data.splice(index, 1)[0];
				resolve(item);
			});
		});
	}

	_findItemByIdSync(id) {
		return this._data.find((el) => el[this._idField] === id);
	}

	_findIndexByIdSync(id) {
		return this._data.findIndex((el) => el[this._idField] === id);
	}

	_addSync(item) {
	  const idField = this._idField;

		if (this._resetIds) {
			item[idField] = this._nextId();
		} else {
			this._updateIds(item[idField]);
		}

		if (this._findItemByIdSync(item[idField])) {
			throw Error(`Found duplicate ID: ${item[idField]}, not adding`);
		}

		this._data.push(item);

    return item;
	}

	_updateIds(newId) {
		if (this._idStrategy === 'increment'
			&& newId > this._maxId) {
			this._maxId = newId;
		}
	}

	_nextId() {
		switch(this._idStrategy) {
			case 'increment':
				return this._incrementId();

			case 'uuid':
				return this._randomUUID();

			default:
				throw Error(`Unknown ID generation strategy, ${this._idStrategy}`);
		}
	}

	_incrementId() {
		return ++this._maxId;
	}

	_randomUUID() {
		const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
		return pattern.replace(/[xy]/g, function(c) {
			const r = Math.random()*16|0;
			const v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}

module.exports = MemoryStore;