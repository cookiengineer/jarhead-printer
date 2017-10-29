
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _table = doc.querySelector('#checklist-table');

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
				if (stl !== null) {
					chunks.push(_render(amounts[id], id, thing));
				}

			}

		});

		if (_table !== null) {
			_table.innerHTML = '<tr>' + chunks.join('</tr><tr>') + '</tr>';
		}

	};

	const _render = function(amount, name, thing) {

		let chunk = '';

		let url = null;
		let stl = thing.stl || null;
		if (stl !== null) {
			url = '../design/' + stl;
		}

		// TODO: Figure out smart way to remember checkboxes

		chunk += '<td><input type="checkbox"></td>';
		chunk += '<td>' + amount + 'x</td>';
		chunk += '<td>' + name + '</td>';

		if (url !== null) {
			chunk += '<td><a href="' + url + '">' + url.split('/').pop() + '</a></td>';
		} else {
			chunk += '<td>-</td>';
		}

		return chunk;

	};



	/*
	 * IMPLEMENTATION
	 */

	APP.checklist = () => {

		let amounts = global.AMOUNTS || null;
		let things  = global.THINGS  || null;

		if (amounts !== null && things !== null) {
			_render_table(amounts, things);
		}

	};

})(typeof window !== 'undefined' ? window : this, document);

