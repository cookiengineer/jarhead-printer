
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _THINGS = global._THINGS = [];

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

		APP.render_bill();
		APP.render_checklist();

	});

})(typeof window !== 'undefined' ? window : this, document);

