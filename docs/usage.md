[GuttenBerry homepage][homepage] | [Documentation & table of contents](TOC.md)

[homepage]: <https://mohammed-taysser.github.io/Gutenberry/>

# Usage

The most basic usage of HTML5 Boilerplate is to create a static site or simple
app. Once you've downloaded or cloned the project, that process looks something
like this:

1. Set up the basic structure of the site.
2. Add some content, style, and functionality.
3. Run your site locally to see how it looks.
4. Deploy your site.

Cool, right? _It is_. That said, the smart defaults, baseline elements, default
attribute values and various other utilities that HTML5 Boilerplate offers can
serve as the foundation for whatever you're interested in building.

Even the basic use-case of a simple static site can be enhanced by manipulating
the code through an automated build process. Moving up in complexity HTML5
Boilerplate can be integrated with whatever front-end framework, CMS or
e-commerce platform you're working with. Mix-and-match to your heart's content.
Use what you need (toss it in a blender if you need to) and discard the rest.
HTML5 Boilerplate is a starting point, not a destination.

## Basic structure

A basic HTML5 Boilerplate site initially looks something like this:

```
.
├── CHANGELOG.md
├── dist
│   ├── css
│   │   ├── core.min.css
│   │   ├── core.min.css.map
│   │   ├── libs
│   │   │   └── fontawesome.min.css
│   │   ├── style.min.css
│   │   └── style.min.css.map
│   ├── fonts
│   │   ├── Tajawal-Regular.ttf
│   │   ├── Ubuntu-Regular.ttf
│   │   └── webfonts
│   │       ├── fa-brands-400.eot
│   │       ├── fa-brands-400.svg
│   │       ├── fa-brands-400.ttf
│   │       ├── fa-brands-400.woff
│   │       ├── fa-brands-400.woff2
│   │       ├── fa-regular-400.eot
│   │       ├── fa-regular-400.svg
│   │       ├── fa-regular-400.ttf
│   │       ├── fa-regular-400.woff
│   │       ├── fa-regular-400.woff2
│   │       ├── fa-solid-900.eot
│   │       ├── fa-solid-900.svg
│   │       ├── fa-solid-900.ttf
│   │       ├── fa-solid-900.woff
│   │       └── fa-solid-900.woff2
│   ├── html
│   │   ├── 404.html
│   │   ├── about-us.html
│   │   ├── articles.html
│   │   ├── contact-us.html
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── post-details.html
│   │   ├── profile.html
│   │   ├── register.html
│   │   └── search.html
│   ├── images
│   │   ├── background
│   │   │   ├── bg-about-us.webp
│   │   │   ├── bg-header.webp
│   │   │   ├── bg-newslatter.webp
│   │   │   ├── bg-post-details-sidebar.webp
│   │   │   ├── bg-post-details.webp
│   │   │   └── blog
│   │   │       ├── bg-blog-1.webp
│   │   │       ├── bg-blog-2.webp
│   │   │       ├── bg-blog-3.webp
│   │   │       ├── bg-blog-4.webp
│   │   │       ├── bg-blog-5.webp
│   │   │       └── bg-blog-6.webp
│   │   └── icons
│   │       ├── apple-touch-icon.png
│   │       ├── dotted-shape.svg
│   │       ├── favicon@192.png
│   │       ├── favicon@2x.png
│   │       ├── favicon@3x.png
│   │       ├── favicon@512.png
│   │       ├── favicon.png
│   │       ├── icon-avatar.webp
│   │       ├── icon-profile.webp
│   │       ├── rounded-shape.svg
│   │       └── shadow.svg
│   └── javascript
│       ├── core.min.js
│       ├── core.min.js.map
│       ├── libs
│       │   ├── bootstrap.bundle.min.js
│       │   ├── cropper.min.js
│       │   ├── html5shiv.min.js
│       │   └── respond.min.js
│       ├── scripts.min.js
│       └── scripts.min.js.map
├── docs
│   ├── css.md
│   ├── extend.md
│   ├── faq.md
│   ├── html.md
│   ├── js.md
│   ├── misc.md
│   ├── TOC.md
│   └── usage.md
├── gulpfile.js
├── humans.txt
├── LICENSE.txt
├── manifest.json
├── package.json
├── package-lock.json
├── README.md
├── robots.txt
├── server.js
├── src
│   ├── css
│   │   ├── core.scss
│   │   ├── libs
│   │   │   └── fontawesome.min.css
│   │   ├── scss
│   │   │   ├── helpers
│   │   │   │   ├── _keyframes.scss
│   │   │   │   ├── _mixins.scss
│   │   │   │   ├── _utilities.scss
│   │   │   │   └── _variables.scss
│   │   │   ├── layout
│   │   │   │   ├── _footer.scss
│   │   │   │   ├── _header.scss
│   │   │   │   └── _navbar.scss
│   │   │   └── libs
│   │   │       └── _cropper.scss
│   │   └── style.scss
│   ├── fonts
│   │   ├── Tajawal-Regular.ttf
│   │   ├── Ubuntu-Regular.ttf
│   │   └── webfonts
│   │       ├── fa-brands-400.eot
│   │       ├── fa-brands-400.svg
│   │       ├── fa-brands-400.ttf
│   │       ├── fa-brands-400.woff
│   │       ├── fa-brands-400.woff2
│   │       ├── fa-regular-400.eot
│   │       ├── fa-regular-400.svg
│   │       ├── fa-regular-400.ttf
│   │       ├── fa-regular-400.woff
│   │       ├── fa-regular-400.woff2
│   │       ├── fa-solid-900.eot
│   │       ├── fa-solid-900.svg
│   │       ├── fa-solid-900.ttf
│   │       ├── fa-solid-900.woff
│   │       └── fa-solid-900.woff2
│   ├── html
│   │   ├── components
│   │   │   ├── footer.pug
│   │   │   ├── header.pug
│   │   │   ├── latest_news.pug
│   │   │   ├── loader.pug
│   │   │   ├── navbar.pug
│   │   │   └── trend_news.pug
│   │   ├── helpers
│   │   │   └── variables.pug
│   │   ├── layouts
│   │   │   └── layout.pug
│   │   └── pages
│   │       ├── 404.pug
│   │       ├── about-us.pug
│   │       ├── articles.pug
│   │       ├── contact-us.pug
│   │       ├── index.pug
│   │       ├── login.pug
│   │       ├── post-details.pug
│   │       ├── profile.pug
│   │       ├── register.pug
│   │       └── search.pug
│   ├── images
│   │   ├── background
│   │   │   ├── bg-about-us.jpg
│   │   │   ├── bg-header.png
│   │   │   ├── bg-login.webp
│   │   │   ├── bg-newslatter.jpg
│   │   │   ├── bg-post-details.jpg
│   │   │   ├── bg-post-details-sidebar.png
│   │   │   └── blog
│   │   │       ├── bg-blog-1.jpg
│   │   │       ├── bg-blog-2.jpg
│   │   │       ├── bg-blog-3.jpg
│   │   │       ├── bg-blog-4.jpg
│   │   │       ├── bg-blog-5.jpg
│   │   │       └── bg-blog-6.jpg
│   │   └── icons
│   │       ├── dotted-shape.svg
│   │       ├── favicon.png
│   │       ├── icon-avatar.png
│   │       ├── icon-profile.jpg
│   │       ├── rounded-shape.svg
│   │       └── shadow.svg
│   ├── javascript
│   │   ├── core.js
│   │   ├── libs
│   │   │   ├── bootstrap.bundle.min.js
│   │   │   ├── bootstrap.bundle.min.js.map
│   │   │   ├── cropper.min.js
│   │   │   ├── html5shiv.min.js
│   │   │   └── respond.min.js
│   │   └── scripts.js
│   └── music
├── temp
│   ├── old
│   │   └── pages
│   │       ├── 404.html
│   │       ├── about.html
│   │       ├── contact.html
│   │       ├── index.html
│   │       ├── login.html
│   │       ├── post_details.html
│   │       ├── posts.html
│   │       ├── profile.html
│   │       ├── register.html
│   │       ├── trends.html
│   │       └── update_profile.html
│   ├── todo.md
│   └── tree.txt
└── __test__
```

What follows is a general overview of each major part and how to use them.

### css

This directory should contain all your project's CSS files. It includes some
initial CSS to help get you started from a solid foundation. [About the CSS](css.md).

### doc

This directory contains all the HTML5 Boilerplate documentation. You can use it
as the location and basis for your own project's documentation.

### js

This directory should contain all your project's JS files. Libraries, plugins,
and custom code can all be included here. It includes some initial JS to help
get you started. [About the JavaScript](js.md).

### .htaccess

The default web server configs are for Apache. For more information, please
refer to the [Apache Server Configs repository](https://github.com/h5bp/server-configs-apache).

Host your site on a server other than Apache? You're likely to find the
corresponding server configs project listed in our [Server Configs](https://github.com/h5bp/server-configs/blob/master/README.md) repository.

### 404.html

A helpful custom 404 to get you started.

### browserconfig.xml

This file contains all settings regarding custom tiles for IE11 and Edge.

For more info on this topic, please refer to [Microsoft's
Docs](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)).

### .editorconfig

The `.editorconfig` file is provided in order to encourage and help you and your
team to maintain consistent coding styles between different editors and IDEs.
[Read more about the `.editorconfig` file](misc.md#editorconfig).

### index.html

This is the default HTML skeleton that should form the basis of all pages on
your site. If you are using a server-side templating framework, then you will
need to integrate this starting HTML with your setup.

Make sure that you update the URLs for the referenced CSS and JavaScript if you
modify the directory structure at all.

### humans.txt

Edit this file to include the team that worked on your site/app, and the
technology powering it.

### package.json

Edit this file to describe your application, add dependencies, scripts and
other properties related to node based development and the npm registry

### robots.txt

Edit this file to include any pages you need hidden from search engines.

### Icons

Replace the default `favicon.ico`, `tile.png`, `tile-wide.png` and Apple Touch
Icon with your own.

If you want to use different Apple Touch Icons for different resolutions please
refer to the [according documentation](extend.md#apple-touch-icons).
