
APP = typeof APP !== 'undefined' ? APP : {};

(function(doc) {

	const _items = Array.from(doc.querySelectorAll('aside > menu > li > a'));
	const _views = Array.from(doc.querySelectorAll('main > section'));


	if (_items.length > 0) {

		_items.forEach(item => {

			item.onclick = function() {

				let href = this.getAttribute('href');
				let view = doc.querySelector(href);
				if (view !== null) {

					_items.forEach(other => other.className = '');
					this.className = 'active';

					_views.forEach(other => other.className = '');
					view.className = 'active';

					location.href = href;

					return false;

				}

				return true;

			};

		});

	}


	APP.view = (identifier) => {

		let item = _items.find(other => other.href.split('#').pop() === identifier) || null;
		if (item !== null) {

			let href = item.getAttribute('href');
			let view = doc.querySelector(href);
			if (view !== null) {

				_items.forEach(other => other.className = '');
				item.className = 'active';

				_views.forEach(other => other.className = '');
				view.className = 'active';

				return true;

			}

		}

		return false;

	};

})(document);

