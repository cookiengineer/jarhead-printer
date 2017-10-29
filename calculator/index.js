
(function(window, document) {

	const _HEADER = '<tr><th>Amount</th><th>Frame Part</th><th>Usage</th><th>Length</th>';

	const _DEFAULT_VOLUME = {
		x: 265,
		y: 420 / 2,
		z: 300
	};

	const _PARTS = [{
		name:      '2040 Aluminium Profile B-Type Nut 6',
		usage:     'Z-Frame (Left and Right)',
		amount:    2,
		length:    440,
		direction: 'z'
	}, {
		name:      '2040 Aluminium Profile B-Type Nut 6',
		usage:     'Y-Frame (Left and Right)',
		amount:    2,
		length:    340,
		direction: 'y'
	}, {
		name:      '2040 Aluminium Profile B-Type Nut 6',
		usage:     'X-Frame (Front, Rear and Middle)',
		amount:    3,
		length:    310,
		direction: 'x'
	}, {
		name:      '2020 Aluminium Profile B-Type Nut 6',
		usage:     'X-Axis',
		amount:    1,
		length:    425,
		direction: 'x'
	}, {
		name:      '2020 Aluminium Profile B-Type Nut 6',
		usage:     'Y-Axis',
		amount:    1,
		length:    380,
		direction: 'y'
	}, {
		name:      '8mm Threaded Rod',
		usage:     'Z-Axis',
		amount:    2,
		length:    355,
		direction: 'z'
	}, {
		name:      '8mm Rod',
		usage:     'Z-Axis',
		amount:    2,
		length:    360,
		direction: 'z'
	}];



	const _button = document.querySelector('button');
	const _inputs = {
		x: document.querySelector('input[name="x"]'),
		y: document.querySelector('input[name="y"]'),
		z: document.querySelector('input[name="z"]')
	};

	const _refresh = function() {

		let dimensions = {
			x: parseInt(_inputs.x.value, 10) || _DEFAULT_VOLUME.x,
			y: parseInt(_inputs.y.value, 10) || _DEFAULT_VOLUME.y,
			z: parseInt(_inputs.z.value, 10) || _DEFAULT_VOLUME.z
		};


		let parts = _PARTS.map(part => {

			let difference = dimensions[part.direction] - _DEFAULT_VOLUME[part.direction];
			let new_length = part.length;
			if (difference > 0) {
				new_length = part.length + difference;
			}

			return Object.assign({}, part, {
				length: new_length
			});

		});


		let table = document.querySelector('table#frame-parts');
		if (table !== null) {

			table.innerHTML = _HEADER + '<tr>' + parts.map(part => {

				let chunk = '';

				chunk += '<td>' + part.amount + 'x</td>';
				chunk += '<td>' + part.name   + '</td>';
				chunk += '<td>' + part.usage  + '</td>';
				chunk += '<td>' + part.length + 'mm</td>';

				return chunk;

			}).join('</tr><tr>') + '</tr>';

		}

	};


	_button.onclick    = () => _refresh();
	_inputs.x.onchange = () => _refresh();
	_inputs.y.onchange = () => _refresh();
	_inputs.z.onchange = () => _refresh();


	window.refresh = _refresh;

})(this, document);

