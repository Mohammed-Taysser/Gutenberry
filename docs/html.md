# The HTML

[GuttenBerry homepage][homepage] | [Documentation & table of contents](TOC.md)

[homepage]: <https://mohammed-taysser.github.io/Gutenberry/>

By default, GuttenBerry provides `layout` page:

a default HTML skeleton that should form the basis of all pages on your website

## `layout.pug`

### The Stored Variable

you can get and set variable to be available in whole pages in `variables.pug`, and will include by default

```pug
include ../helpers/variables
```

### Determine Active Page

use `current_page` variable to detect current page

```pug
block current_page 
  - var current_page = 'home'
```

the in [`navbar.pug`](../src/html/components/navbar.pug) we use it as condition to check if it the page we are ? yeah it is then add `active` class. if not the don't add `active` class

```pug
a(href='index.html' class=(current_page === "home" ? "nav-link active" : 'nav-link')) Home
```

**note:** `active` class can be change but you must change the style to work with it.
you will find the style in [`navbar.scss`](../src/css/scss/layout/_navbar.scss)

### The `no-js` Class

The `no-js` class is provided in order to allow you to more easily and
explicitly add custom styles based on whether JavaScript is disabled (`.no-js`)
or enabled (`.js`). Using this technique also helps [avoid the FOUC](https://www.paulirish.com/2009/avoiding-the-fouc-v3/).

### Language Attribute

Please consider specifying the language of your content by adding a [value](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
to the `lang` attribute in the `<html>` as in this example:

```pug
html(lang="en")
//- OR
html(lang="ar")
```

### The order of the `<title>` and `<meta>` tags

The charset declaration (`<meta charset="utf-8">`) must be included completely
within the [first 1024 bytes of the document](https://html.spec.whatwg.org/multipage/semantics.html#charset) and should be specified as early as possible (before any content that could be controlled by an attacker, such as a `<title>` element) in order to avoid a
potential [encoding-related security issue](https://code.google.com/archive/p/doctype-mirror/wikis/ArticleUtf7.wiki) in Internet Explorer.

using the power of variables in pug. we also can change page title depend on the page itself

```pug
// Set character encoding for the document
meta(charset="UTF-8")

// Document Title
block title
    title layout
```

### Meta Description

The `description` meta tag provides a short description of the page. In some
situations this description is used as a part of the snippet shown in the search
results.

```pug
// Meta Description
meta(name="description" content="How to Create A Perfect Blog With GuttenBerry")
```

Google's [Create good meta descriptions](https://support.google.com/webmasters/answer/35624?hl=en#meta-descriptions) documentation has useful tips on creating an effective description.

### Mobile Viewport

There are a few different options that you can use with the `viewport` meta tag .You can find out more in [the MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag).
GuttenBerry comes with a simple setup that strikes a good balance for general use cases.

```pug
// Viewport for responsive web design
meta(name="viewport", content="width=device-width, initial-scale=1.0")
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

```pug
meta(property='og:type' content='website')
meta(property='og:title' content=current_page)
meta(property='og:description' content='How to Create A Perfect Blog With GuttenBerry')
meta(property='og:url' content='https://mohammed-taysser.github.io/Gutenberry/')
meta(property='og:image' content='../images/background/bg-website-card.webp')
```

### Web App Manifest

GuttenBerry includes a simple web app manifest file.

The web app manifest is a simple JSON file that allows you to control how your
app appears on a device's home screen, what it looks like when it launches in
that context and what happens when it is launched. This allows for much greater
control over the UI of a saved site or web app on a mobile device.

It's linked to from the HTML as follows:

```pug
link(rel='manifest' href='../../app.webmanifest' crossorigin="use-credentials")
```

in [our `app.webmanifest`](../app.webmanifest) just the basic usage. You should fill this file out with [more information about your site or application](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### Stylesheet

after compile scss or sass files you will find minify and compiled css file in dist directory

```pug
link(rel="stylesheet", href="../css/core.min.css")
```

also provide variable to add specific stylesheet file within a page

```pug
block style
  //- add more stylesheet files
```

### Favicons and Touch Icon

The shortcut icons should be put in the root directory of your site.
`favicon.ico` is automatically picked up by browsers if it's placed in the root.

GuttenBerry comes with a default set of icons (include favicon and one
Apple Touch Icon) that you can use as a baseline to create your own.

```pug
//-  Standard favicon
link(rel="icon" type="image/x-icon" href="../images/icons/favicon.ico")

//- Recommended favicon format
link(rel='icon' type='image/png' href='../images/icons/favicon.png')
```

Please refer to the more detailed description in the [Extend section](extend.md)
of these docs.

## `theme-color` Meta Tag

the theme-color value for the name attribute of the `<meta>` element indicates a suggested color that user agents should use to customize the display of the page or of the surrounding user interface. If specified, the content attribute must contain a valid CSS `<color>`.

```pug
meta(name='theme-color' content='#9400ff')
```

You can provide a media type or query inside the media attribute; the color will then only be set if the media condition is true. For example:

```pug
meta(name="theme-color" media="(prefers-color-scheme: light)" content="#9400ff")
meta(name="theme-color" media="(prefers-color-scheme: dark)" content="#9400ff")
```

## Loading Animation

the following code is the loading animation

**not:** you should take into consider to stay the id `js-loading-container` as it without change as it use in Js code to remove animation after loading content.

also `loading-overlay` is the background to hide page content to appear loading animation well.

```pug
.loading-overlay
#js-loading-container.loading-container
  .loading-divider(aria-hidden='true')
  p.loading-text(aria-label='Loading')
    span.letter(aria-hidden='true') L
    span.letter(aria-hidden='true') o
    span.letter(aria-hidden='true') a
    span.letter(aria-hidden='true') d
    span.letter(aria-hidden='true') i
    span.letter(aria-hidden='true') n
    span.letter(aria-hidden='true') g
```

to change it. just remove both `loading-divider` element and `loading-text` element
then replace it with your loading. for example:

```pug
.loading-overlay
#js-loading-container.loading-container
  img(src='../images/icons/loading.gif' width='100px' height='100px')
```

### body content

the following is the components in `<body>`.
don't forget to remain `load` class to body tag to active loading animation

```pug
body.load 
  include ../components/loader
  include ../components/navbar
  block content 
  include ../components/footer
```

### scripts

as well as stylesheet block we also provide javascript block for addditional scripts

```pug
block javascript
  //- add more scripts here
```

### What About Polyfills?

If you need to include [polyfills](https://remysharp.com/2010/10/08/what-is-a-polyfill) in your project, you must make sure those load before any other JavaScript. If you're
using a polyfill CDN service, like [polyfill.io](https://polyfill.io/v3/), just put
it before the other scripts in the bottom of the page:

```pug
script(src='../javascript/libs/modernizr-3.11.7.min.js')
//- or using CDN
script(src='https://polyfill.io/v3/polyfill.min.js')
script(src='../javascript/core.min.js')
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

As of v2.0.0 we no longer include jQuery by default. Web development has changed a lot since we started this project and while many millions of sites still use jQuery there are many sites and applications that don't. 10 years ago
jQuery _was_ JavaScript for most developers. That's not the case any more so we've made the decision to remove jQuery from the project.

If you're interested in including it, you can easily done of the following:

- install jQuery using the following command:
  ```
  npm install jquery
  ```
- You can then copy the minified file into the `js/libs` folder and add `jQuery` to the `index.html` manually.

To load `jQuery` from a CDN with a local fallback you can use the following:

```pug
script(src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous")
```

### Create New Page

so 😮 for now we din't take how to start writing a new page.
don't worry we will discuss it now 😉

as first step and after long taken you should now know what is the component in your website like `current_page` variable or even `block style` ... etc.

please if you didn't know what is that you will find them in [`html.md`](html.md) docs

now let's see what is page structure

```pug
extends ../layouts/layout

block title 
  title GuttenBerry | Page Title

block current_page 
  - var current_page = 'page-title'

block style 
  link(rel="stylesheet" href="../css/style.min.css")

block scripts 
  script(href="../javascript/scripts.min.js")

block content 
  h1 your content start here
```

that's it. change `title` as you need, also `current_page` and don't forget to modify condition in [`navbar.pug`](../src/html/components/navbar.pug) to verify which page is active.

both `style` and `scripts` block are optional so you can let them empty or even remove them.

happy hacking 💻

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
  │   ├── our_team.pug
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

4 directories, 19 files
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
