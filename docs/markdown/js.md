# The JavaScript Files

[GuttenBerry homepage][homepage] | [Documentation & table of contents](TOC.md)

[homepage]: <https://mohammed-taysser.github.io/Gutenberry/>
[cropper]: <https://github.com/fengyuanchen/cropperjs>
[html5shiv]: <https://github.com/aFarkas/html5shiv>
[Respond]: <https://github.com/scottjehl/Respond>
[glide]: <https://github.com/glidejs/glide>
[autoComplete]: <https://github.com/TarekRaafat/autoComplete.js>

Information about the default JavaScript included in the project.

## `core.min.js`

This file can be used to contain or reference your site/app JavaScript code.

If you're working on something more advanced you might replace this file entirely.
That's cool.

for further development write your own code in  `scripts.min.js` file

## libs

This directory can be used to contain all 3rd party library code.

### `html5shiv.min.js`

HTML5shiv is a javascript workaround to provide support for the new HTML5 elements in IE Browsers older than IE 9.

- HTML5shiv is found within the `<head>` tag.
- HTML5shiv is a javascript file that is referenced in a `<script>` tag.
- You should use HTML5shiv when you are using the new HTML5 elements such as:`<article>`, `<section>`, `<aside>`, `<nav>`, `<footer>`.
- You will require the HTML5shiv to provide compatibility for IE Browsers older than IE 9.

for further information visit [`html5shiv` github page][html5shiv]

### `respond.min.js`

Respond.js is a fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)

use to enable responsive web designs in browsers that don’t support CSS3 Media Queries – in particular, Internet Explorer 8 and under. It’s written in such a way that it will probably patch support for other non-supporting browsers as well.

for further information visit [`Respond` github page][Respond]

### `Glide.min.js`

Glide.js is a dependency-free JavaScript ES6 slider and carousel. It’s lightweight, flexible and fast. Designed to slide. No less, no more

for further information visit [`glide` github page][glide]

### `cropper.min.js`

javascript library use to crop user avatar before upload

for further information visit [`cropper.js` github page][cropper]

### `bootstrap.bundle.min.js`

bootstrap js bundle file to provide interactivity for component like tooltip

for further information visit [bootstrap docs](https://getbootstrap.com/docs/5.1/getting-started/javascript/)

### `autoComplete.min.js`

autoComplete.js is a simple, pure vanilla Javascript library progressively designed for speed, high versatility, and seamless integration with a wide range of projects & systems

for further information visit [`autoComplete` github page][autoComplete]

### `scripts.min.js`

empty js file to write custom & additional code

## Project Structure Tree

### `src` directory

```text
src/javascript/
├── core.js
├── libs
│  ├── autoComplete.min.js
│  ├── bootstrap.bundle.min.js
│  ├── bootstrap.bundle.min.js.map
│  ├── cropper.min.js
│  ├── glide.min.js
│  ├── html5shiv.min.js
│  └── respond.min.js
└── scripts.js

1 directory, 9 files
```

### `dist` directory

```text
dist/javascript/
├── core.min.js
├── core.min.js.map
├── libs
│   ├── autoComplete.min.js
│   ├── bootstrap.bundle.min.js
│   ├── bootstrap.bundle.min.js.map
│   ├── cropper.min.js
│   ├── glide.min.js
│   ├── html5shiv.min.js
│   └── respond.min.js
├── scripts.min.js
└── scripts.min.js.map

1 directory, 11 files
```
