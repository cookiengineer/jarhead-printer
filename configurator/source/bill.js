
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _THINGS = [];

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

	const _walk_requires = function(amounts, things, thing) {

		thing.requires.forEach(req => {

			let amount = req.amount;
			if (amount > 0) {

				let name = req.name;

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

			let thing = things.find(other => other.name === id) || null;
			if (thing !== null) {

				let stl = thing.stl || null;
				if (stl === null) {
					chunks.push(_render(amounts[id], id, thing));
				}

			} else {

				chunks.push(_render(amounts[id], id, null));

			}

		});

		if (_table !== null) {
			_table.innerHTML = '<tr>' + chunks.join('</tr><tr>') + '</tr>';
		}

	};

	const _render = function(amount, name, thing) {

		let chunk = '';

		// TODO: Figure out smart way to remember checkboxes

		chunk += '<td><input type="checkbox"></td>';
		chunk += '<td>' + amount + 'x</td>';
		chunk += '<td>' + name + '</td>';

		return chunk;

	};



	/*
	 * IMPLEMENTATION
	 */

	APP.bill = () => {

		let amounts = {};
		let things  = [];


		JSON.parse(JSON.stringify(_THINGS)).forEach(thing => {

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


				let valid = true;
				let config_idlers = depends['config-idlers'] || null;
				let config_tools  = depends['config-tools']  || null;
				let config_wheels = depends['config-wheels'] || null;

				if (config_idlers !== null && SETTINGS.idlers !== config_idlers) {
					valid = false;
				}

				if (config_tools !== null && SETTINGS.tools !== config_tools) {
					valid = false;
				}

				if (config_wheels !== null && SETTINGS.wheels !== config_wheels) {
					valid = false;
				}


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

		_render_table(amounts, things);

	};


	/*
	 * EVENTS
	 */

	global.addEventListener('DOMContentLoaded', () => {

		Promise.all([
			_load('meta/aluminium-parts.json'),
			_load('meta/parts.json'),
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

