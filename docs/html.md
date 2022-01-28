# The HTML

[GuttenBerry homepage][homepage] | [Documentation & table of contents](TOC.md)

[homepage]: <https://mohammed-taysser.github.io/Gutenberry/>

By default, GuttenBerry provides `layout` page:

a default HTML skeleton that should form the basis of all pages on your website

## `index.html`

### The `no-js` Class

The `no-js` class is provided in order to allow you to more easily and
explicitly add custom styles based on whether JavaScript is disabled (`.no-js`)
or enabled (`.js`). Using this technique also helps [avoid the FOUC](https://www.paulirish.com/2009/avoiding-the-fouc-v3/).

### Language Attribute

Please consider specifying the language of your content by adding a [value](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
to the `lang` attribute in the `<html>` as in this example:

```html
<html lang="en">
<!-- OR -->
<html lang="ar">
```

### The order of the `<title>` and `<meta>` tags

The charset declaration (`<meta charset="utf-8">`) must be included completely
within the [first 1024 bytes of the document](https://html.spec.whatwg.org/multipage/semantics.html#charset) and should be specified as early as possible (before any content that could be controlled by an attacker, such as a `<title>` element) in order to avoid a
potential [encoding-related security issue](https://code.google.com/archive/p/doctype-mirror/wikis/ArticleUtf7.wiki) in Internet Explorer.

```html
<meta charset="UTF-8" />
<title>GuttenBerry | Page Title</title>
```

### Meta Description

The `description` meta tag provides a short description of the page. In some
situations this description is used as a part of the snippet shown in the search
results.

```html
<meta name="description" content="How to Create Perfect Blog With GuttenBerry">
```

Google's [Create good meta descriptions](https://support.google.com/webmasters/answer/35624?hl=en#meta-descriptions) documentation has useful tips on creating an effective description.

### Mobile Viewport

There are a few different options that you can use with the `viewport` meta tag .You can find out more in [the MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag).
GuttenBerry comes with a simple setup that strikes a good balance for general use cases.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

If you want to take advantage of edge-to-edge displays of iPhone X/XS/XR you can do so with additional viewport parameters. [Check the WebKit blog](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) for details.

### Open Graph Metadata

The [Open Graph Protocol](https://ogp.me/) allows you to define the way your
site is presented when referenced on third party sites and applications
(Facebook, Twitter, LinkedIn). The protocol provides a series of meta elements
that define the details of your site. The required attributes define the title,
preview image, URL, and [type](https://ogp.me/#types) (e.g., video, music,
website, article).

In addition to these four attributes there are many more attributes you can use
to add more richness to the description of your site. This just represents the
most basic implementation.

To see a working example, the following is the open graph metadata for the HTML5
Boilerplate site. In addition to the required fields we add `og:description` to
describe the site in more detail.

```html
<!-- facebook card -->
<meta property="og:url" content="https://example.com/">
<meta property="og:title" content="your title">
<meta property="og:type" content="website">
<meta property="og:description" content="How to Creat a Perfect Blog With GuttenBerry.">
<meta property="og:image" content="../favicon.png">

<!-- twitter cards-->
<meta name="twitter:card" content="app" />
<meta name="twitter:title" content="Home" />
<meta name="twitter:site" content="@username" />
<meta name="twitter:description" content="Description of the page less than 150 characters" />
<meta name="twitter:image" content="../favicon.png" />
<meta name="twitter:image:alt" content="favicon alternative text" />
```

### Web App Manifest

GuttenBerry includes a simple web app manifest file.

The web app manifest is a simple JSON file that allows you to control how your
app appears on a device's home screen, what it looks like when it launches in
that context and what happens when it is launched. This allows for much greater
control over the UI of a saved site or web app on a mobile device.

It's linked to from the HTML as follows:

```html
<link rel="manifest" href="manifest.json">
```

in [our `manifest.json`](../manifest.json) just the basic usage. You should fill this file out with [more information about your site or application](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### Favicons and Touch Icon

The shortcut icons should be put in the root directory of your site.
`favicon.ico` is automatically picked up by browsers if it's placed in the root.

GuttenBerry comes with a default set of icons (include favicon and one
Apple Touch Icon) that you can use as a baseline to create your own.

```html
<!-- Standard favicon-->
<!-- <link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">-->
<!-- Recommended favicon format-->
<link rel="icon" type="image/png" href="../images/icons/favicon.png" /><!-- favicon-->
<link rel="apple-touch-icon" sizes="180x180" href="../images/icons/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="../images/icons/favicon@3x.png" />
<link rel="icon" type="image/png" sizes="16x16" href="../images/icons/favicon@2x.png" />
<link rel="mask-icon" href="../images/icons/favicon.png" color="#9400ff" />
<meta name="msapplication-TileColor" content="#603cba" />
```

Please refer to the more detailed description in the [Extend section](extend.md)
of these docs.

## `theme-color` Meta Tag

the theme-color value for the name attribute of the `<meta>` element indicates a suggested color that user agents should use to customize the display of the page or of the surrounding user interface. If specified, the content attribute must contain a valid CSS `<color>`.

```html
<meta name="theme-color" content="#ffffff" />
```

You can provide a media type or query inside the media attribute; the color will then only be set if the media condition is true. For example:

```html
<meta name="theme-color" media="(prefers-color-scheme: light)" content="white">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black">
```

### What About Polyfills?

If you need to include [polyfills](https://remysharp.com/2010/10/08/what-is-a-polyfill) in your project, you must make sure those load before any other JavaScript. If you're
using a polyfill CDN service, like [polyfill.io](https://polyfill.io/v3/), just put
it before the other scripts in the bottom of the page:

```html
  <script src="js/libs/modernizr-3.11.7.min.js"></script>
  <script src="https://polyfill.io/v3/polyfill.min.js"></script>
  <script src="js/scripts.js"></script>
</body>
```

When you have a bunch of polyfills to load in, you could also
create a `polyfills.js` file in the `js/libs` directory or include the files
individually and combine them using a build tool. Always ensure that the
polyfills are all loaded before any other JavaScript.

There are some misconceptions about Modernizr and polyfills. It's important to
understand that Modernizr just handles feature checking, not polyfilling itself.
The only thing Modernizr does regarding polyfills is that the team maintains
[a huge list of cross Browser polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills).

### jQuery

As of v2.0.0 we no longer include jQuery by default. Web development has
changed a lot since we started this project and while many millions of sites
still use jQuery there are many sites and applications that don't. 10 years ago
jQuery _was_ JavaScript for most developers. That's not the case any more so
we've made the decision to remove jQuery from the project.

If you're interested in including it, you can easily done of the following:

- install jQuery using the following command:
  ```
  npm install jquery
  ```
- You can then copy the minified file into the `js/libs` folder and add `jQuery` to the `index.html` manually.

To load `jQuery` from a CDN with a local fallback you can use the following:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.6.0.min.js"><\/script>')</script>
```

## Project Structure Tree

### `src` directory

```text
src/html/
  ├── components
  │   ├── footer.pug
  │   ├── header.pug
  │   ├── latest_news.pug
  │   ├── loader.pug
  │   ├── navbar.pug
  │   └── trend_news.pug
  ├── helpers
  │   └── variables.pug
  ├── layouts
  │   └── layout.pug
  └── pages
      ├── 404.pug
      ├── about-us.pug
      ├── articles.pug
      ├── contact-us.pug
      ├── index.pug
      ├── login.pug
      ├── post-details.pug
      ├── profile.pug
      ├── register.pug
      └── search.pug

4 directories, 18 files
```

### `dist` directory

```text
dist/html/
  ├── 404.html
  ├── about-us.html
  ├── articles.html
  ├── contact-us.html
  ├── index.html
  ├── login.html
  ├── post-details.html
  ├── profile.html
  ├── register.html
  └── search.html

0 directories, 10 files
```
