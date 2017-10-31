
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _STORAGE  = global.localStorage;
	const _THINGS   = [];

	const _fetch = global.fetch;
	const _load  = function(url) {

		let config  = {
			method: 'GET',
			mode:   'cors',
			cache:  'default'
		};

		return fetch(new Request(url, config)).then(response => {

			let type = response.headers.get('content-type');
			if (type.includes('application/json')) {
				return response.json();
			} else {
				return [];
			}

		}).catch(error => {
			console.error(error);
		});

	};

	const _create_thing = function(name, amount) {

		return {
			name:     name,
			amount:   amount,
			state:    false,
			requires: []
		};

	};

	const _walk_requires = function(amounts, things, thing) {

		thing.requires.forEach(req => {

			let amount = req.amount;
			if (amount > 0) {

				let name  = req.name;
				let valid = APP.check_depends(req);
				if (valid === true) {

					if (amounts[name] === undefined) {
						amounts[name] = amount;
					} else {
						amounts[name] += amount;
					}

					let other = things.find(t => t.name === name) || null;
					if (other !== null) {
						_walk_requires(amounts, things, other);
					}

				}

			}

		});

	};

	const _table = doc.querySelector('#bill-table');

	const _render_table = function(amounts, things) {

		let chunks = [];

		Object.keys(amounts).sort((a, b) => {

			if (a < b) return -1;
			if (a > b) return  1;
			return 0;

		}).forEach(id => {

			let chunk = _render_thing(amounts[id], id, things);
			if (chunk !== '') {
				chunks.push(chunk);
			}

		});

		if (_table !== null) {
			_table.innerHTML = '<tr>' + chunks.join('</tr><tr>') + '</tr>';
		}

	};

	const _render_thing = function(amount, name, things) {

		let chunk = '';
		let thing = things.find(other => other.name === name) || null;
		if (thing === null) {
			thing = _create_thing(name, amount);
			things.push(thing);
		}

		let stl = thing.stl || null;
		if (stl === null) {
			chunk += '<td><input type="checkbox" onchange="APP.check(\'' + thing.name + '\', this.checked)"' + (thing.state === true ? 'checked' : '') + '></td>';
			chunk += '<td>' + amount + 'x</td>';
			chunk += '<td>' + name + '</td>';
		}

		return chunk;

	};



	/*
	 * IMPLEMENTATION
	 */

	APP.bill = () => {

		let amounts = {};
		let things  = [];


		JSON.parse(JSON.stringify(_THINGS)).forEach(thing => {

			thing.state = false;


			let depends = thing.depends || null;
			if (depends !== null) {

				let check_x = depends.x || null;
				let check_y = depends.y || null;
				let check_z = depends.z || null;

				if (check_x !== null) {
					thing.length  = depends.x + (SETTINGS.x - DEFAULTS.x);
					thing.name   += ' ' + thing.length + 'mm';
				} else if (check_y !== null) {
					thing.length  = depends.y + (SETTINGS.y - DEFAULTS.y);
					thing.name   += ' ' + thing.length + 'mm';
				} else if (check_z !== null) {
					thing.length  = depends.z + (SETTINGS.z - DEFAULTS.z);
					thing.name   += ' ' + thing.length + 'mm';
				}


				let valid = APP.check_depends(thing);
				if (valid === true) {
					things.push(thing);
				}

			} else {

				things.push(thing);

			}

		});

		things.forEach(thing => {

			let amount = thing.amount;
			if (amount > 0) {

				let name = thing.name;

				if (amounts[name] === undefined) {
					amounts[name] = amount;
				} else {
					amounts[name] += amount;
				}


				for (let a = 0; a < amount; a++) {

					let requires = thing.requires;
					if (requires.length > 0) {
						_walk_requires(amounts, things, thing);
					}

				}

			}

		});

		things.sort((a, b) => {

			if (a.name < b.name) return -1;
			if (a.name > b.name) return  1;
			return 0;

		});


		global.AMOUNTS = amounts;
		global.THINGS  = things;

		try {
			_STORAGE.setItem('jarhead-amounts', JSON.stringify(amounts));
			_STORAGE.setItem('jarhead-things',  JSON.stringify(things));
		} catch (err) {
		}

		_render_table(amounts, things);

	};

	APP.check = (id, state) => {

		console.log('"' + id + '"', state);

		let thing = THINGS.find(other => other.name === id) || null;
		if (thing !== null) {
			thing.state = state;
		}

		try {
			_STORAGE.setItem('jarhead-things', JSON.stringify(THINGS));
		} catch (err) {
		}

	};


	/*
	 * EVENTS
	 */

	global.addEventListener('DOMContentLoaded', () => {

		try {

			let amounts = _STORAGE.getItem('jarhead-amounts');
			if (amounts !== null) {
				global.AMOUNTS = JSON.parse(amounts);
			}

			let things = _STORAGE.getItem('jarhead-things');
			if (things !== null) {
				global.THINGS = JSON.parse(things);
			}

			if (amounts !== null && things !== null) {

				console.info('Restored Things', AMOUNTS, THINGS);
				_render_table(AMOUNTS, THINGS);

				APP.checklist();

			}

		} catch (err) {
		}


		Promise.all([
			_load('meta/alu-parts.json'),
			_load('meta/pla-parts.json'),
			_load('meta/tools.json'),
			_load('meta/frame.json'),
			_load('meta/x-carriage.json'),
			_load('meta/y-carriage.json')
		]).then(results => {

			results.forEach(result => {

				result.forEach(thing => {

					if (thing.requires === undefined) {
						thing.requires = [];
					}

					_THINGS.push(thing);

				});

			});

		});

	}, true);

})(typeof window !== 'undefined' ? window : this, document);

