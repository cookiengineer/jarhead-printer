
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _DEFAULTS = global.DEFAULTS = global.SETTINGS = {
		x:       265,
		y:       210,
		z:       300,
		idlers:  '605zz',
		nuts:    'alu',
		pulleys: 'alu',
		tools:   'e3d-hotend',
		wheels:  'openbuilds',
	};

	const _INPUTS  = {};
	const _STORAGE = global.localStorage;

	const _update_inputs = function(settings) {

		for (let id in _INPUTS) {

			if (_INPUTS[id] instanceof Array) {

				let map = settings[id];

				_INPUTS[id].forEach(input => {

					if (input.type === 'checkbox') {

						if (map.includes(input.value) === false) {
							input.removeAttribute('checked');
						} else {
							input.setAttribute('checked', true);
						}

					} else if (input.type === 'radio') {

						if (map.includes(input.value) === false) {
							input.removeAttribute('checked');
						} else {
							input.setAttribute('checked', true);
						}

					}

				});

			} else {

				_INPUTS[id].value = settings[id];

			}

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	APP.check_depends = (thing) => {

		let depends = thing.depends || null;
		if (depends !== null) {

			let valid = true;

			for (let id in depends) {

				let value = depends[id];

				if (id.startsWith('config-')) {

					let key = id.split('-').slice(1).join('-');
					if (SETTINGS[key] !== value) {
						valid = false;
					}

				}

			}

			return valid;

		}


		return true;

	};

	APP.config = () => {

		let settings = {};

		for (let id in _INPUTS) {

			if (_INPUTS[id] instanceof Array) {

				let values = [];

				_INPUTS[id].forEach(input => {

					if (input.type === 'checkbox') {

						if (input.checked === true) {
							values.push(input.value);
						}

					} else if (input.type === 'radio') {

						if (input.checked === true) {
							values.push(input.value);
						}

					}

				});

				if (values.length === 1) {
					settings[id] = values[0];
				} else {
					settings[id] = values;
				}

			} else {

				let value = _INPUTS[id].value;
				if (/^([0-9]+)$/g.test(value)) {
					value = parseInt(value, 10);
				}

                settings[id] = value;

			}

		}

		global.SETTINGS = settings;

		try {
			_STORAGE.setItem('jarhead-settings', JSON.stringify(settings));
		} catch (err) {
		}


		APP.update_bill();
		APP.update_checklist();

		APP.view('bill');

	};

	APP.restore = () => {

		_STORAGE.removeItem('jarhead-settings');
		_STORAGE.removeItem('jarhead-cache');

		global.SETTINGS = Object.assign({}, _DEFAULTS);
		global.CACHE    = {};

		_update_inputs(SETTINGS);

		console.info('Restored Defaults', SETTINGS);


		APP.update_bill();
		APP.update_checklist();

	};



	/*
	 * EVENTS
	 */

	doc.addEventListener('DOMContentLoaded', () => {

		Array.from(doc.querySelectorAll('#config input'))
			.filter(input => input.name.startsWith('config-'))
			.forEach(input => {

				let name = input.getAttribute('name').split('-').slice(1).join('-');
				let type = input.getAttribute('type');
				if (type === 'checkbox' || type === 'radio')  {

					if (_INPUTS[name] === undefined) {
						_INPUTS[name] = [ input ];
					} else {
						_INPUTS[name].push(input);
					}

				} else if (type === 'number') {

					_INPUTS[name] = input;

				}

			});


		try {

			let settings = _STORAGE.getItem('jarhead-settings');
			if (settings !== null) {
				global.SETTINGS = JSON.parse(settings);
			}

			if (settings !== null) {
				console.info('Restored Settings', SETTINGS);
				_update_inputs(SETTINGS);
			}

		} catch (err) {
		}

	}, true);

})(typeof window !== 'undefined' ? window : this, document);

