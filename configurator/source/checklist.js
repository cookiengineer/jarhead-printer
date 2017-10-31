
APP = typeof APP !== 'undefined' ? APP : {};

(function(global, doc) {

	const _table = doc.querySelector('#checklist-table');

	const _render_table = function(cache) {

		let chunks = Object.keys(cache.amounts)
			.sort((a, b) => {

				if (a < b) return -1;
				if (a > b) return  1;
				return 0;

			}).filter(name => {
				return cache.types[name] === 'print';
			}).map(name => {

				return {
					name:   name,
					amount: cache.amounts[name],
					state:  cache.states[name],
					thing:  _THINGS.find(t => t.name === name) || null
				};

			}).filter(entry => {

				if (entry.thing !== null) {
					return APP.check_depends(entry.thing);
				}

				return false;

			}).map(entry => {

				return _render_entry(entry.amount, entry.name, entry.state, entry.thing);

			});

		if (_table !== null) {
			_table.innerHTML = '<tr>' + chunks.join('</tr><tr>') + '</tr>';
		}

	};

	const _render_entry = function(amount, name, state, thing) {

		let chunk = '';
		let url   = '../design/' + thing.stl;

		chunk += '<td><input type="checkbox" onchange="APP.check(\'' + name + '\', this.checked)"' + (state === true ? 'checked' : '') + '></td>';
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

	APP.render_checklist = APP.update_checklist = () => {

		let cache = global.CACHE || null;
		if (cache !== null) {
			_render_table(cache);
		}

	};

})(typeof window !== 'undefined' ? window : this, document);

