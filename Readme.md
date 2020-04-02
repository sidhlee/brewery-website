# Brewery Website

## Setting up with Parcel

1. `yarn init --y`
2. `yarn add parcel-bundler --dev`
3. `package.json`

```json
 "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  }
```

4. `src/index.html`

```html
<script src="index.js"></script>
</body>
```

## Fluid Font Size

```scss
a {
  ...
  // fluid font-size (especially for < 350px). * 4vw is my magic number :p
  font-size: min(max(4vw, 1rem), 1.4rem);
  ...
```

## Margin doesn't work on inline elements!

To have any vertical space(or dimension) like margin | height, it has to be block | inline-block object.

## Global Grid Settings

You can setup a global grid system if your page layout follows the same pattern in every section.

### HTML inline elements

- input, label, button, select, textarea
- a, span, img
- code, strong, i, small

```scss
// _general.scss - these rules apply to everything in layout

.section {
  // setting up a global grid system (3 cols)
  display: grid;
  grid: auto-flow / minmax(1em, 1fr) minmax(300px, 700px) minmax(1em, 1fr);
  padding: 5em 0;

  &__title,
  &__subtitle,
  p {
    grid-column: 2 / 3;
  }
}
```

## `justify-self` is the `display: inline-block;` for grid

By default, grid-item spans whole grid area (`stretch`) to which the item is assigned.  
Use `justify-self: start | end | center` to make it inline-block.

## CSS properties to remember

### `order: 0;`

The `order` property specifies the order of an item inside flex-box or grid, and has 0 as default value.

- **`order: 0;` is equivalent to not setting order at all.**

### `all: unset;`

Removes all default browser styling (for selected element)

```scss
&__button {
  all: unset;
}
```

### `grid: auto-flow / repeat(3, 1fr);`

`auto-flow` is by default, and add more rows / column as they get specified with `grid-column` | `grid-row`

```scss
.grid-carousel {
  display: grid;
  // auto-flow: set 1 row and fill in each row in turn adding new rows as defined by grid-row later (default)
  // grid: auto-flow / 1em repeat(5, 1fr) 1em; // this is the same as below;
  grid-template-columns: 1em repeat(5, 1fr) 1em;
```

### `currentColor`

https://css-tricks.com/currentcolor/

`css-tricks`

> …you can use this value to indicate you want to use the value of color for other properties that accept a color value: borders, box shadows, outlines, or backgrounds.

`vscode doc`

> The value of the 'color' property. The computed value of the 'currentColor' keyword is the computed value of the 'color' property. If the 'currentColor' keyword is set on the 'color' property itself, it is treated as 'color:inherit' at parse time.

```css
div {
  color: red;
  border: 5px solid currentColor;
  box-shadow: 0 0 5px solid currentColor;
}
```

### That tacky padded outline..

Bring it with `padding` + `outline` + `outline-offset`

```css
.card {
  padding: 2em;
  outline: 2px solid currentColor;
  outline-offset: -1em;
```
