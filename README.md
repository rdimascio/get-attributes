# Get Attributes

[![Build status](https://img.shields.io/travis/rdimascio/get-attributes/master?style=flat-square)](https://travis-ci.org/rdimascio/get-attributes)
[![Coverage](https://img.shields.io/coveralls/github/rdimascio/get-attributes/master?style=flat-square)](https://coveralls.io/github/rdimascio/get-attributes?branch=master)
[![npm version](https://img.shields.io/npm/v/get-attributes?style=flat-square)](https://www.npmjs.com/package/get-attributes)
[![Donate](https://img.shields.io/badge/donate-paypal-blue?style=flat-square)](https://www.paypal.me/rdimascio/5)

## What is this?

A lightweight, fully-tested, zero-dependency module to make it easier to work with element attributes, both in browser and Node environments.

```shell
npm install get-attributes
```

## Usage

### 1. Install

There are multiple ways you can install the script. The advised method is to install using [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```shell
npm i -S get-attributes
```

If you're not using a module bundler with your client-side JavaScript, (i.e. Webpack, Parcel, Rollup, Snowpack) then you can load the script from a CDN provider:

```html
<!-- choose one -->
<script src="https://unpkg.com/get-attributes"></script>
<script src="https://cdn.jsdelivr.net/npm/get-attributes/dist/index.js"></script>
```

### 2. Usage

If you installed the script using npm, then import the package and call the methods.

**Note:** In Node environments, the `parse()` method will only accept a `string`.

```js
import getAttributes from 'get-attributes';

const myElementAttributes = getAttributes.parse(document.getElementById('myElement'));
```

If you loaded the script from a CDN provider, `getAttributes` will be globally available. (**Note:** This can potentially cause namespace collision, which is why the recommended method is to use npm).

```html
<script src="https://unpkg.com/get-attributes"></script>
<script>
    const myElementAttributes = getAttributes.parse(document.getElementById('myElement'));
</script>
```

## API Reference

### `getAttributes.parse()`

Accepts either a `node` or a `string`. Returns an `object` with all of the element's attributes.

#### Usage

```html
<div id="myElement" class="foo bar" data-random-attribute="23ijo" data-empty-attribute></div>

<script>
    getAttributes.parse(document.getElementById('myElement'));

    // {
    //     class="foo bar",
    //     "data-empty-attribute": "",
    //     "data-random-attribute": "23ijo",
    //     id: "myElement"
    // }
</script>
```

```js
import getAttributes from 'get-attributes';

getAttributes.parse(document.getElementById('myElement'));

// {
//     class="foo bar",
//     "data-empty-attribute": "",
//     "data-random-attribute": "23ijo",
//     id: "myElement"
// }
```

```js
import getAttributes from 'get-attributes';

const myElementString = `<div id="myElement" class="foo bar" data-random-attribute="23ijo" data-empty-attribute></div>`;

getAttributes.parse(myElementString);

// {
//     class="foo bar",
//     "data-empty-attribute": "",
//     "data-random-attribute": "23ijo",
//     id: "myElement"
// }
```

### `getAttributes.stringify()`

Accepts an `object`. Retuns a `string` with all of the element's attributes.

```html
<div id="myElement" class="foo bar" data-random-attribute="23ijo" data-empty-attribute></div>

<script>
    const myElementAttributes = getAttributes.parse(document.getElementById('myElement'));
    
    getAttributes.stringify(myElementAttributes);
    
    // `class="foo bar" data-random-attribute="23ijo" data-empty-attribute id="myElement"`
</script>
```

```js
import getAttributes from 'get-attributes';

const myElementAttributes = getAttributes.parse(document.getElementById('myElement'));

getAttributes.stringify(myElementAttributes);

// `class="foo bar" data-random-attribute="23ijo" data-empty-attribute id="myElement"`
```

```js
import getAttributes from 'get-attributes';

const myElementString = `<div id="myElement" class="foo bar" data-random-attribute="23ijo" data-empty-attribute></div>`;
const myElementAttributes = getAttributes.parse(myElementString);

getAttributes.stringify(myElementAttributes);
    
// `class="foo bar" data-random-attribute="23ijo" data-empty-attribute id="myElement"`
```
