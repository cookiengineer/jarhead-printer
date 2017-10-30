
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _DEFAULTS = global.DEFAULTS = {
		x:      265,
		y:      210,
		z:      300,
		tools:  'e3d-hotend',
		wheels: 'openbuilds',
		idlers: 'openbuilds'
	};

	const _STORAGE = global.localStorage;

	const _inputs = {
		x: doc.querySelector('input#config-x'),
		y: doc.querySelector('input#config-y'),
		z: doc.querySelector('input#config-z'),
		tools: [
			doc.querySelector('input#config-tools-e3d'),
			doc.querySelector('input#config-tools-cnc')
		],
		wheels: [
			doc.querySelector('input#config-wheels-openbuilds'),
			doc.querySelector('input#config-wheels-605zz')
		],
		idlers: [
			doc.querySelector('input#config-idlers-openbuilds'),
			doc.querySelector('input#config-idlers-gt20')
		]
	};

	const _update_inputs = function(settings) {

		for (let id in _inputs) {

			if (_inputs[id] instanceof Array) {

				let map = settings[id];

				_inputs[id].forEach(input => {

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

				_inputs[id].value = settings[id];

			}

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	APP.config = () => {

		let settings = {};

		for (let id in _inputs) {

			if (_inputs[id] instanceof Array) {

				let values = [];

				_inputs[id].forEach(input => {

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

				let value = _inputs[id].value;
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


		APP.bill();
		APP.checklist();

		APP.view('bill');

	};

	APP.restore = () => {

		_STORAGE.removeItem('jarhead-settings');
		_STORAGE.removeItem('jarhead-amounts');
		_STORAGE.removeItem('jarhead-things');

		global.SETTINGS      = Object.assign({}, _DEFAULTS);
		global.AMOUNTS       = {};
		global.THINGS        = [];

		_update_inputs(SETTINGS);

		console.info('Restored Defaults', SETTINGS);


		APP.bill();

	};



	/*
	 * EVENTS
	 */

	doc.addEventListener('DOMContentLoaded', () => {

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

