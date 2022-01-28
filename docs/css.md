
# The CSS & SCSS Files

[GuttenBerry homepage][homepage] | [Documentation & table of contents](TOC.md)

[homepage]: <https://mohammed-taysser.github.io/Gutenberry/>
[fontawesome]: <https://fontawesome.com>
[cropper]: <https://github.com/fengyuanchen/cropperjs>

## core.scss

Several base styles for whole pages.parts included in `core.scss`:

- `scss/helpers/variables`  : store website colors as variables
- `scss/helpers/mixins`     : useful mixin to be use
- `scss/helpers/utilities`  : most custom and global style found here
- `scss/helpers/keyframes`  : store all website css keyframes

some separate components

- `scss/layout/footer`
- `scss/layout/header`      : header are exist only on homepage(until writing date)
- `scss/layout/navbar`

These styles are included & minified and renamed 😃 in
[core.min.css](../../Gutenberry/dist/css/core.min.css) using gulp as task runner.

I prefer let every library file standalone for further update

for further style write your own style in  `style.min.css` file

## libs

### `cropper.min.css`

css style for javascript library use to crop user avatar before upload

for further information visit [`cropper.js` github page][cropper]

### Font Awesome Free v5.15.4

Get vector icons and social logos on your website with Font Awesome, the web's most popular icon set and toolkit.

For more information about Font Awesome, please refer to its [project page][fontawesome].

### bootstrap

in latest version i install bootstrap using npm to customize used `scss` component

see [`core.min.scss`](../src/css/core.scss) for live example

## Project Structure Tree

### `src` directory

```text
src/css/
├── core.scss
├── libs
│   └── fontawesome.min.css
├── scss
│   ├── helpers
│   │   ├── _keyframes.scss
│   │   ├── _mixins.scss
│   │   ├── _utilities.scss
│   │   └── _variables.scss
│   ├── layout
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   └── _navbar.scss
│   └── libs
│       └── _cropper.scss
└── style.scss

5 directories, 11 files
```

### `dist` directory

```text
dist/css/
├── core.min.css
├── core.min.css.map
├── libs
│  └── fontawesome.min.css
├── style.min.css
└── style.min.css.map

1 directory, 6 files
```
