
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _STORAGE  = global.localStorage;
	const _THINGS   = global._THINGS || [];

	const _walk_requirements = function(cache, thing, amount) {

		amount = typeof amount === 'number' ? amount : 1;


		let name = thing.name;

		if (cache.amounts[name] === undefined) {
			cache.amounts[name] = amount;
		} else {
			cache.amounts[name] += amount;
		}

		let requires = thing.requires || [];
		if (requires.length > 0) {

			for (let a = 0; a < amount; a++) {

				requires.forEach(req => {

					let valid   = true;
					let depends = req.depends || null;
					if (depends !== null) {
						valid = APP.check_depends(req);
					}


					if (valid === true) {

						let other = _THINGS.find(t => t.name === req.name) || null;
						if (other !== null) {

							valid = APP.check_depends(other);

							if (valid === true) {
								_walk_requirements(cache, other, req.amount);
							}

						} else {

							if (cache.amounts[req.name] === undefined) {
								cache.amounts[req.name] = req.amount;
							} else {
								cache.amounts[req.name] += req.amount;
							}

						}

					}

				});

			}

		}

	};

	const _table = doc.querySelector('#bill-table');

	const _render_table = function(cache) {

		let chunks = Object.keys(cache.amounts)
			.sort((a, b) => {

				if (a < b) return -1;
				if (a > b) return  1;
				return 0;

			}).filter(name => {
				return cache.types[name] === 'order';
			}).map(name => {

				return {
					name:   name,
					amount: cache.amounts[name],
					state:  cache.states[name]
				};

			}).map(entry => {

				return _render_entry(entry.amount, entry.name, entry.state);

			});

		if (_table !== null) {
			_table.innerHTML = '<tr>' + chunks.join('</tr><tr>') + '</tr>';
		}

	};

	const _render_entry = function(amount, name, state) {

		let chunk = '';

		chunk += '<td><input type="checkbox" onchange="APP.check(\'' + name + '\', this.checked)"' + (state === true ? 'checked' : '') + '></td>';
		chunk += '<td>' + amount + 'x</td>';
		chunk += '<td>' + name + '</td>';

		return chunk;

	};



	/*
	 * IMPLEMENTATION
	 */

	APP.render_bill = () => {

		let cache = global.CACHE || null;
		if (cache !== null) {
			_render_table(cache);
		}

	};

	APP.update_bill = () => {

		let cache = {
			amounts: {},
			states:  {},
			types:   {}
		};


		JSON.parse(JSON.stringify(_THINGS))
			.filter(thing => thing.amount > 0)
			.filter(thing => APP.check_depends(thing))
			.map(thing => {

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

				}

				return thing;

			}).forEach(thing => {

				_walk_requirements(cache, thing, thing.amount);

			});

		Object.keys(cache.amounts).forEach(name => {

			let type  = 'order';
			let check = _THINGS.find(t => t.name === name) || null;
			if (check !== null) {

				let stl = check.stl || null;
				if (stl !== null) {
					type = 'print';
				}

			}


			cache.states[name] = false;
			cache.types[name]  = type;

		});

		global.CACHE = cache;

		try {
			_STORAGE.setItem('jarhead-cache', JSON.stringify(cache));
		} catch (err) {
		}

		_render_table(cache);

	};

	APP.check = (id, state) => {

		console.log('"' + id + '"', state);

		CACHE.states[id] = state;

		try {
			_STORAGE.setItem('jarhead-cache', JSON.stringify(CACHE));
		} catch (err) {
		}

	};


	/*
	 * EVENTS
	 */

	global.addEventListener('DOMContentLoaded', () => {

		try {

			let cache = _STORAGE.getItem('jarhead-cache');
			if (cache !== null) {

				global.CACHE = JSON.parse(cache);

				console.info('Restored Cache', CACHE);

				APP.render_bill();
				APP.render_checklist();

			}

		} catch (err) {
			console.error(err);
		}

	}, true);

})(typeof window !== 'undefined' ? window : this, document);

