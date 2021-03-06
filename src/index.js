/**
 * Copyright (c) 2018 Ryan DiMascio.
 * Licensed under the MIT License (MIT), see
 * https://github.com/rimascio/getAttributes
 *
 * Helper methods to make working with element attributes easier.
 *
 * @returns {Object}
 */
export default (function () {
	'use strict';

	/**
	 * Accepts either a `node` or a `string`. Returns an `object` with all of the element's attributes.
	 *
	 * @param {String|Node} el - HTML Element
	 * @returns {Object}
	 *
	 * @example
	 *
	 * getAttributes.parse(document.getElementById('myElement'));
	 *
	 * or
	 *
	 * getAttributes.parse(`<div id="myElement" class="foo bar" data-random-attribute="23ijo" data-empty-attribute></div>`);
	 *
	 * will return:
	 *
	 * //	{
	 * //		class="foo bar",
	 * //		"data-empty-attribute": "",
	 * //		"data-random-attribute": "23ijo",
	 * //		id: "myElement"
	 * //	}
	 */
	const parse = function (element) {
		// Handles support for strings.
		if (typeof element === 'string') {
			// Check for empty string.
			if (!element) {
				throw new ReferenceError(
					'The string given to `getAttributes.parse()` is empty.'
				);
			}

			// We're not in a browser environment.
			/* eslint-disable-next-line no-undef */
			if (typeof document === 'undefined') {
				const elementString = element
					.match(/<(.*?)>/)[1]
					.split(/( )(?=(?:[^"]|"[^"]*")*$)/)
					.filter(item => item.trim());

				elementString.splice(0, 1);

				const attributes = {};

				elementString.forEach(s => {
					const parts = s.split('=');
					const name = parts[0];
					const value = parts[1] ? parts[1].replace(/"/g, '') : '';

					attributes[name] = value;
				});

				return attributes;
			}

			const elementType = element
				.match(/<(.*?)>/)[1]
				.split(' ')
				.splice(0, 1)[0];

			/* eslint-disable-next-line no-undef */
			const elementDom = new DOMParser().parseFromString(element, 'text/html');
			const newElement = elementDom.querySelector(elementType);

			return getAttributesFromNode(newElement);
		}

		// Handles support for Nodes.
		/* eslint-disable-next-line no-undef */
		if (typeof element === 'object' && element instanceof window.Node) {
			return getAttributesFromNode(element);
		}

		// Don't support anything else.

		throw new TypeError(
			'`getAttributes.parse()` only accepts strings and nodes. An ' +
				typeof element +
				' was given.'
		);
	};

	/**
	 * Accepts an `object`. Retuns a `string` with all of the element's attributes.
	 *
	 * @param {Object} object - An object of attributes with format: `{ Name<string>: Value<string> }`.
	 * @returns {String}
	 *
	 * @example
	 *
	 * onst myElement = getAttributes.parse(document.getElementById('myElement'));
	 *
	 * or
	 *
	 * const myElement = `<div id="myElement" class="foo bar" data-random-attribute="23ijo" data-empty-attribute></div>`;
	 *
	 * const myElementAttributes = getAttributes.parse(myElement);
	 * getAttributes.stringify(myElement);
	 *
	 * will return:
	 *
	 * `class="foo bar" data-random-attribute="23ijo" data-empty-attribute id="myElement"`
	 *
	 */
	const stringify = function (attrs) {
		if (!attrs) {
			throw new ReferenceError('Cannot stringify undefined.');
		}

		if (typeof attrs === 'string') {
			return attrs;
		}

		return Array.isArray(attrs) ?
			attrs.join(' ') :
			Object.keys(attrs)
				.map(attr => {
					let string = attr;

					if (attrs[attr]) {
						string += '="' + attrs[attr] + '"';
					}

					return string;
				})
				.join(' ');
	};

	/**
	 * Get HTML attributes from an element.
	 * @param {Node} el - Element.
	 * @returns {Object}
	 */
	function getAttributesFromNode(element) {
		const elementAttrs = element.attributes;
		const attributes = {};
		let i;

		for (i = 0; i < elementAttrs.length; i++) {
			// `elAttrs` is a `NamedNodeMap` (https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)
			// and the Object.values are `Attr` objects (https://developer.mozilla.org/en-US/docs/Web/API/Attr)
			// so we need tp use the `name` and `value` properties.

			const name = elementAttrs[i].name;
			const value = elementAttrs[i].value;

			attributes[name] = value;
		}

		return attributes;
	}

	return {
		parse,
		stringify
	};
})();
